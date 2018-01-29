interface IAirport {
    id: number;
    name: string;
    city: string;
    country: string;
    code: string;
    latitude: number;
    longitude: number;
}

const AirportByIATACodeMap = {};
[ [ 5,"Port Moresby Jacksons International Airport","Port Moresby","Papua New Guinea","POM",-9.443380355834961,147.22000122070312 ],
  [ 3339,"Melbourne International Airport","Melbourne","Australia","MEL",-37.673301696777344,144.84300231933594 ],
  [ 3316,"Singapore Changi Airport","Singapore","Singapore","SIN",1.35019,103.994003 ],
  [ 3361,"Sydney Kingsford Smith International Airport","Sydney","Australia","SYD",-33.94609832763672,151.177001953125 ],
  [ 3484,"Los Angeles International Airport","Los Angeles","United States","LAX",33.94250107,-118.4079971 ],
  [ 2279,"Narita International Airport","Tokyo","Japan","NRT",35.7647018433,140.386001587 ],
  [ 507,"London Heathrow Airport","London","United Kingdom","LHR",51.4706,-0.461941 ],
  [ 3077,"Chek Lap Kok International Airport","Hong Kong","Hong Kong","HKG",22.3089008331,113.915000916 ],
  [ 3351,"Perth International Airport","Perth","Australia","PER",-31.94029998779297,115.96700286865234 ]
].forEach(item => {
    let airport = {
        id: item[0],
        name: item[1],
        city: item[2],
        country: item[3],
        code: item[4],
        latitude: item[5],
        longitude: item[6]
    } as IAirport;
    AirportByIATACodeMap[airport.code] = airport;
});

const GetAirportByCode = (code: string) : IAirport => {
    return AirportByIATACodeMap[code];
};

export { GetAirportByCode }