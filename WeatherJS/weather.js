class Weather {
  constructor(city, state) {
    this.apiKey = '843516b96bd6e78a8ddae8bfc0e79c1f';
    this.city = city;
    this.state = state;
  }

  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&
        exclude={part}&appid={YOUR API KEY}`);
  }
}
