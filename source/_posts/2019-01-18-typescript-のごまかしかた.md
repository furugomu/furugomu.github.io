---
layout: blog
title: TypeScript のごまかしかた
date: 2019-01-18T06:08:42.537Z
---
## 存在しないプロパティ

any にキャストする

```ts
(document as any).foo.bar.baz;
```

## 謎のグローバル変数

```ts
declare var jQuery: any;
```

## 型定義がないライブラリ

`jquery.d.ts` をどこかに作ってこのように書く。

```ts
declare module "jquery" {
  const jQuery: any;
  export default jQuery;
}
```

すると `import 'jquery'` できるようになる。
