class AppService {
  static getData = () => window.localStorage.getItem('data');

  static setData = (easy: string) => window.localStorage.setItem('data', easy);
}

export default AppService;