declare module "node-pandoc" {
  // see: https://github.com/eshinn/node-pandoc#readme
  function nodePandoc(
    src: string,
    args: string | string[],
    callback: (err: unknown | undefined, result: string) => void
  );
  export default nodePandoc;
}
