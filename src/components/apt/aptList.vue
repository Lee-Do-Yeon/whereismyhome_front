<template>
  <div>
    <!-- //// -->
    <div class="container mt-3" style="padding-top: 100px">
      <h2>아파트 리스트</h2>
      <div class="row col-md-12 justify-content-center mb-2">
        <div class="form-group col-md-2">
          <select class="form-select bg-secondary text-light" id="sido">
            <option value="">시도선택</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <select class="form-select bg-secondary text-light" id="gugun">
            <option value="">구군선택</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <select class="form-select bg-secondary text-light" id="dong" onchange="changeSelect()">
            <option value="">동선택</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <form id="dong-form" method="post" action="${root}/main">
            <input type="hidden" name="act" value="dong" />
            <input type="hidden" id="dong-form-input" name="dong" value="" />

            <div>
              <input type="radio" id="price" name="sort" value="price" checked />
              <label for="price">가격순 정렬</label>
            </div>
            <div>
              <input type="radio" id="area" name="sort" value="area" />
              <label for="area">면적순 정렬</label>
            </div>

            <div>
              <input type="radio" id="price" name="order" value="desc" checked />
              <label for="price">내림차순</label>
            </div>
            <div>
              <input type="radio" id="area" name="order" value="asc" />
              <label for="area">오름차순</label>
            </div>
            <button type="button" id="list-btn" class="btn btn-outline-primary">검색</button>
          </form>
        </div>
      </div>
      <div id="map" style="width: 100%; height: 700px"></div>
      <!-- <script>
            // 지도 생성
            var mapContainer = document.getElementById("map"), // 지도를 표시할 div
              mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 2,
                // 지도의 확대 레벨
              };

            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);
            var obj = new Object();
            var list = [];
          </script> -->
      <div style="height: 50px"></div>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>아파트이름</th>
            <th>아파트가격</th>
            <th>면적</th>
            <th>주소</th>
            <th>날짜</th>
            <th>인근 지하철역</th>
          </tr>
        </thead>
        <tbody id="list">
          <c:if test="${!empty donglist}">
            <c:forEach items="${metroDtoList}" var="metro" varStatus="status">
              <!-- <script>
                var obj = new Object();
                obj.latitude = ${metro.latitude};
                obj.longitude = ${metro.longitude};
                obj.name = '${metro.stationName}';
                list.push(obj);
              </script> -->
            </c:forEach>
            <c:forEach items="${donglist}" var="apt" varStatus="status">
              <tr>
                <td class="code">
                  <a href="${root}/main?act=apt&aptname=${apt.getAptname()}&dong=${apt.getDong()}"
                    >${apt.getAptname()}</a
                  >
                </td>
                <td>${apt.getAptprice()}</td>
                <td>${apt.getAptarea()}</td>
                <td>${apt.getDong()}${apt.getNumber()} ${apt.getAptname()}</td>
                <td>${apt.getYear()}.${apt.getMonth()}.${apt.getDay()}</td>
                <td id="${apt.aptname }-metro">asdf</td>

                <!-- <script>
                  console.log("${apt.getDong()}" + " " + "${apt.getNumber()}");

                  function makeMarker(data, name) {
                    // 주소-좌표 변환 객체를 생성합니다
                    var geocoder = new kakao.maps.services.Geocoder();
                    // 주소로 좌표를 검색합니다
                    console.log(geocoder);
                    geocoder.addressSearch(
                      "${apt.getDong()}" + " " + "${apt.getNumber()}",
                      function (result, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === kakao.maps.services.Status.OK) {
                          debugger;
                          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                          var metro = findNearestMetro(result[0].y, result[0].x);
                          document.getElementById("${apt.aptname}-metro").innerHTML = metro;
                          console.log(metro);
                          // 결과값으로 받은 위치를 마커로 표시합니다
                          var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords,
                          });
                        }
                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                          content:
                            '<div style="width:150px;text-align:center;padding:6px 0; color:black;">' +
                            name +
                            "</div>",
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                      }
                    );
                  }
                  makeMarker(
                    "${apt.getDong()}" + " " + "${apt.getNumber()}",
                    "${apt.getAptname()}"
                  );

                  function findNearestMetro(x, y) {
                    var mn = 100000000;
                    var metroName;
                    for (var i = 0; i < list.length; i++) {
                      var metro = list[i];
                      var distance = distanceInKilometerByHaversine(
                        x,
                        y,
                        metro.latitude,
                        metro.longitude
                      );
                      if (distance < mn) {
                        mn = distance;
                        metroName = metro.name;
                      }
                    }
                    return metroName;
                  }

                  function distanceInKilometerByHaversine(x1, y1, x2, y2) {
                    var distance;
                    var radius = 6371; // 지구 반지름(km)
                    var toRadian = Math.PI / 180;

                    var deltaLatitude = Math.abs(x1 - x2) * toRadian;
                    var deltaLongitude = Math.abs(y1 - y2) * toRadian;

                    var sinDeltaLat = Math.sin(deltaLatitude / 2);
                    var sinDeltaLng = Math.sin(deltaLongitude / 2);
                    var squareRoot = Math.sqrt(
                      sinDeltaLat * sinDeltaLat +
                        Math.cos(x1 * toRadian) *
                          Math.cos(x2 * toRadian) *
                          sinDeltaLng *
                          sinDeltaLng
                    );

                    distance = 2 * radius * Math.asin(squareRoot);

                    return distance;
                  }
                </script> -->
              </tr>
            </c:forEach>
          </c:if>
        </tbody>
      </table>
      <div style="height: 70px"></div>
    </div>
    <!-- //// -->
  </div>
</template>

<script>
export default {
  name: "AptList",
  methods: {},
};
</script>

<style></style>
