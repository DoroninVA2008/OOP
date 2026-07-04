type ExtractArrayType<T> = T extends (infer Item)[] ? Item : never
// @ts-ignore
type Test1 = ExtractArrayType<string[]> // @ts-ignore
type Test2 = ExtractArrayType<number[]> // @ts-ignore
type Test3 = ExtractArrayType<boolean[]> // @ts-ignore
type Test4 = ExtractArrayType<{ id: string }[]> // @ts-ignore
type Test5 = ExtractArrayType<{ id: number }[]> // @ts-ignore
type Test6 = ExtractArrayType<{ id: boolean }[]> // @ts-ignore
type Test7 = ExtractArrayType<string> // @ts-ignore
type Test8 = ExtractArrayType<number> // @ts-ignore
type Test9 = ExtractArrayType<boolean> // @ts-ignore
type Test10 = ExtractArrayType<never>