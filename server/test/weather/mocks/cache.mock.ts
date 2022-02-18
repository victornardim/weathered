class CacheMock {
  public set(value: string): Promise<string> {
    return Promise.resolve(value);
  }

  public get(): Promise<string> {
    return Promise.resolve('America/Sao_Paulo');
  }
}

export default new CacheMock();
