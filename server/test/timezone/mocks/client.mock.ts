class TimezoneClientMock {
  public getByCoordinates(): string[] {
    return ['America/Sao_Paulo'];
  }
}

export default new TimezoneClientMock();
