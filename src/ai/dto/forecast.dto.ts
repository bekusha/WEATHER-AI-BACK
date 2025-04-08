export class ForecastDto {
    city: {
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
    };
    list: Array<{
      dt_txt: string;
      main: {
        temp: number;
      };
      weather: Array<{
        description: string;
      }>;
    }>;
  }