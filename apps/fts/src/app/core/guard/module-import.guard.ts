// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throwIfAlreadyLoaded = (parentModule: any, moduleName: string) => {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`
    );
  }
};
