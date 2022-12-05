<template>
  <div class="container" id="app" v-cloak>
    <div>
      <h2>{{ room.name | roomName }}</h2>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <label class="input-group-text">내용</label>
      </div>
      <input type="text" class="form-control" v-model="message" v-on:keypress.enter="sendMessage" />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="sendMessage">보내기</button>
      </div>
    </div>
    <b-list-group>
      <b-list-group-item class="text-left" v-for="(message, index) in recvList" :key="index">
        <strong>{{ message.sender }}</strong> : {{ message.message }}
      </b-list-group-item>
    </b-list-group>
    <div></div>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import axios from "@/api/http";

export default {
  data() {
    return {
      roomId: "",
      room: {},
      sender: "",
      message: "",
      recvList: [],
    };
  },
  filters: {
    roomName(val) {
      return val.replaceAll('"', "");
    },
  },
  created() {
    this.connect();
    this.roomId = localStorage.getItem("wschat.roomId");
    this.sender = localStorage.getItem("wschat.sender");
    this.findRoom();
  },
  methods: {
    findRoom() {
      axios.get(`/chat/room/${this.roomId}`).then((res) => {
        console.log("찾은 방 : " + JSON.stringify(res.data));
        console.log("찾은 방 이름 : " + res.data.name);
        this.room = {
          name: res.data.name,
          roomId: res.data.roomId,
        };
      });
    },
    sendMessage() {
      console.log("Send message:" + this.message);
      this.stompClient.send(
        "/pub/chat/message",
        JSON.stringify(
          {
            type: "TALK",
            roomId: this.roomId,
            sender: this.sender,
            message: this.message,
          },
          {}
        )
      );
      this.message = "";
    },
    recvMessage(recv) {
      this.recvList.unshift({
        type: recv.type,
        sender: recv.type == "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      });
    },
    connect() {
      var sock = new SockJS("http://localhost:9999/ws-stomp");
      this.stompClient = Stomp.over(sock);
      console.log(`소켓 연결을 시도합니다.`);
      // pub/sub event
      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          // 구독하기
          console.log("소켓 연결 성공", frame);
          this.stompClient.subscribe(`/sub/chat/room/${this.roomId}`, (message) => {
            console.log("구독으로 받은 메시지 입니다.", message.body);
            this.recvMessage(JSON.parse(message.body));
          });
        },
        // 소켓 연결 실패
        (error) => {
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    }, // connect() 끝
  },
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
