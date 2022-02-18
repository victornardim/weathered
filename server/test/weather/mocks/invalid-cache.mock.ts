class InvalidCacheMock {
  public set(value: string): Promise<string> {
    return Promise.resolve(value);
  }

  public get(): Promise<string> {
    return Promise.resolve('');
  }
}

export default new InvalidCacheMock();
