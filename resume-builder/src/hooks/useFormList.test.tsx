import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFormList } from "./useFormList.tsx";
import { InputField } from "../data/resume.model.tsx";

type TestItem = {
    fieldA: InputField;
    fieldB: InputField;
};

const DEFAULT_ITEM: TestItem = {
    fieldA: { value: "", name: "fieldA", label: "Field A", type: "text", required: false },
    fieldB: { value: "", name: "fieldB", label: "Field B", type: "text", required: true },
};

function changeEvent(name: string, value: string) {
    return { target: { name, value } } as React.ChangeEvent<HTMLInputElement>;
}

describe("useFormList", () => {
    it("starts with a single copy of the default item", () => {
        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM));

        expect(result.current.list).toHaveLength(1);
        expect(result.current.list[0].fieldA.value).toBe("");
        expect(result.current.errorsList).toEqual([{}]);
    });

    it("restores a provided initial list instead of the default", () => {
        const saved: TestItem[] = [
            { ...DEFAULT_ITEM, fieldA: { ...DEFAULT_ITEM.fieldA, value: "restored" } },
        ];

        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM, saved));

        expect(result.current.list).toHaveLength(1);
        expect(result.current.list[0].fieldA.value).toBe("restored");
    });

    it("addItem appends a fresh default item and a matching empty error slot", () => {
        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM));

        act(() => result.current.addItem());

        expect(result.current.list).toHaveLength(2);
        expect(result.current.list[1].fieldA.value).toBe("");
        expect(result.current.errorsList).toHaveLength(2);
    });

    it("removeItem removes the matching index from both list and errorsList", () => {
        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM));

        act(() => result.current.addItem());
        act(() => result.current.handleChange(changeEvent("fieldA", "second"), 1));
        act(() => result.current.removeItem(0));

        expect(result.current.list).toHaveLength(1);
        expect(result.current.list[0].fieldA.value).toBe("second");
    });

    it("handleChange updates only the targeted field", () => {
        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM));

        act(() => result.current.handleChange(changeEvent("fieldA", "hello"), 0));

        expect(result.current.list[0].fieldA.value).toBe("hello");
        expect(result.current.list[0].fieldB.value).toBe("");
    });

    it("handleChange records a validation error for the edited field", () => {
        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM));

        act(() => result.current.handleChange(changeEvent("fieldB", ""), 0));

        expect(result.current.errorsList[0].fieldB).toBe("This field is required.");
    });

    it("editing one field does not revert a sibling field edited moments earlier (regression)", () => {
        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM));

        act(() => result.current.handleChange(changeEvent("fieldA", "first edit"), 0));
        act(() => result.current.handleChange(changeEvent("fieldB", "second edit"), 0));

        expect(result.current.list[0].fieldA.value).toBe("first edit");
        expect(result.current.list[0].fieldB.value).toBe("second edit");
    });

    it("handleChange at one index does not affect other entries", () => {
        const { result } = renderHook(() => useFormList<TestItem>(DEFAULT_ITEM));

        act(() => result.current.addItem());
        act(() => result.current.handleChange(changeEvent("fieldA", "entry zero"), 0));
        act(() => result.current.handleChange(changeEvent("fieldA", "entry one"), 1));

        expect(result.current.list[0].fieldA.value).toBe("entry zero");
        expect(result.current.list[1].fieldA.value).toBe("entry one");
    });
});
