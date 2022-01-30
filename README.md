# MMM-GyeonggiBus
MagicMirror Gyeonggi-Do Bus

Additional Module for MagicMirror² https://github.com/MichMich/MagicMirror

# Module: MMM-GyeonggiBus
Magic Mirror Module for Gyeonggi-Do, South Korea, bus information.   
Returns real-time info about a SPECIFIC bus stop and a SPECIFIC bus route.

![GyeonggiBusModule](https://user-images.githubusercontent.com/8663339/151705306-d9d0878b-396c-4343-90c4-f93331717b8f.png)
![GyeonggiBusModuleMain](https://user-images.githubusercontent.com/8663339/151705326-a0ef7063-ae05-4236-b014-d35e597c28f9.png)

## Using the module
Git clone from this repository into the modules sub-directory of the Magic Mirror installation, change directory into the newly cloned code and then run npm install.

```
git clone https://github.com/iceship/MMM-GyeonggiBus.git
cd MMM-GyeonggiBus
npm install
```

To use this module, add it to the modules array in the config/config.js file:

```
{
        module: "MMM-GyeonggiBus",
        position: "bottom_left",
        config: {
                apiBase: "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList",
                serviceKey: "GET_YOUR_SERVICEKEY",
                stationId: 236000618, //Get StationId from https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=GDKWAGWYRKJYIRVX110226832213&infSeq=1
                routeId: 236000222, //"버스 노선 조회 서비스"의 "노선번호목록조회" 기능으로 버스 번호를 입력해 해당 버스 번호(노선 번호의) routeId를 얻는다.
                header: "3006번 버스 도착 정보", //Header Title
                updateInterval: 1000*60*1, // 1 minute.
        },
},
```
## Configuration Options
|Option|Description|
| --- | --- |
|apiBase|GyeonggiBus base API http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList|
|serviceKey|Get key from https://www.data.go.kr/data/15080346/openapi.do|
|stationId|Get StationId from https://data.gg.go.kr/portal/data/service/selectServicePage.do?infId=GDKWAGWYRKJYIRVX110226832213&infSeq=1|
|routeId|"버스 노선 조회 서비스"의 "노선번호목록조회" 기능으로 버스 번호를 입력해 해당 버스 번호(노선 번호의) routeId를 얻는다.|
|header|Title Info|
|updateInterval|1000 * 60 * 1  for 1minute.

## Notes
This is for Gyeonggi-Do Bus Information.

## ServiceKey
Sing up for account here: https://www.data.go.kr/data/15080346/openapi.do
To get a ServiceKey 

