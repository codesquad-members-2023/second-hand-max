import { act, renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import useImageInput from "../../src/hooks/useImageInput";

describe("useImageInput hook", () => {
  it("should set image file if file size and type are valid", () => {
    const { result } = renderHook(() => useImageInput({ sizeLimit: 5000000 }));

    const validFile = createFileOfSize(4000000);

    act(() => {
      const mockedFileList = mockFileList(validFile);
      result.current.onChange({
        target: { files: mockedFileList },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.error).toBe("");
    expect(result.current.imageFile).toBe(validFile);
  });

  it("should set error if file size exceeds the limit", () => {
    const { result } = renderHook(() => useImageInput({ sizeLimit: 5000000 })); // 예: 5MB

    const oversizedFile = createFileOfSize(6000000);

    act(() => {
      const mockedFileList = mockFileList(oversizedFile);
      result.current.onChange({
        target: { files: mockedFileList },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.error).toBe("이미지 사이즈 5MB 이하");
    expect(result.current.imageFile).toBeNull();
  });

  it("should set error if file type is not image", () => {
    const { result } = renderHook(() => useImageInput({ sizeLimit: 5000000 }));

    const nonImageFile = new File(["hello"], "hello.txt", {
      type: "text/plain",
    });

    act(() => {
      const mockedFileList = mockFileList(nonImageFile);
      result.current.onChange({
        target: { files: mockedFileList },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.error).toBe("이미지 파일만 업로드 가능합니다");
    expect(result.current.imageFile).toBeNull();
  });
});

function createFileOfSize(size: number): File {
  const dummyData = new Uint8Array(size).fill(0);
  return new File([dummyData], "photo.jpg", {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}

function mockFileList(...files: File[]): FileList {
  return {
    length: files.length,
    item: (index: number) => files[index],
    [Symbol.iterator]: function* () {
      yield* files;
    },
    ...files.reduce(
      (acc, file, index) => {
        acc[index] = file;
        return acc;
      },
      {} as Record<number, File>
    ),
  } as FileList;
}
