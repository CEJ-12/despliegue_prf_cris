<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h5 style="font-size: 1.9em; font-weight: 700">{{ $t('message.advertisements') }}</h5>
        <AnnouncementSlider class="bg-image-size"></AnnouncementSlider>
      </div>
      <div class="col-lg-4 text-center">
        <h5 style="font-size: 1.9em; font-weight: 700">{{ $t('message.events') }}</h5>
        <hooper
          :vertical="true"
          style="height: 600px"
          :itemsToShow="2"
          :autoPlay="true"
          :playSpeed="3000"
          :hoverPause="true"
        >
          <slide v-for="card in events" :key="card.title">
            <v-card>
              <v-img
                :src="card.image"
                class="white--text align-end bg-events-size"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title
                  v-text="card.title"
                  style="word-break: break-word;
                    font-size: 1.1em;
                    font-weight: 600;
                  "
                ></v-card-title>
              </v-img>

              <v-card-actions>
                <p style="word-break: break-word">
                  {{ card.date }} - {{ card.hour }}
                </p>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn> -->
                <!-- <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn> -->
                <v-speed-dial v-model="card.dialShare" direction="left">
                  <template v-slot:activator>
                    <v-btn fab bottom small color="#ffc107">
                      <v-icon v-if="card.dialShare">mdi-close</v-icon>
                      <v-icon v-else>mdi-share-variant</v-icon>
                    </v-btn>
                  </template>
                  <div class="share-network-list">
                    <ShareNetwork
                      v-for="network in networks"
                      :network="network.network"
                      :key="network.network"
                      :style="{ backgroundColor: network.color }"
                      :url="sharing.url"
                      :title="card.title"
                      :description="sharing.description"
                      :quote="card.title"
                      :hashtags="card.title"
                      :twitterUser="sharing.twitterUser"
                    >
                      <em :class="network.icon"></em>
                      <span>{{ network.name }}</span>
                    </ShareNetwork>
                  </div>
                </v-speed-dial>
              </v-card-actions>
            </v-card>
          </slide>
        </hooper>
      </div>
    </div>
  </div>
</template>
<script>
import AnnouncementSlider from "@/components/public/AnnouncementSlider/index.vue";
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    AnnouncementSlider,
    Hooper,
    Slide,
  },
  data() {
    return {
      events: [],
      sharing: {
        url: "https://ipssoma.com",
        title: "",
        description: "",
        quote: "",
        hashtags: "",
      },

      networks: [
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5",
        },

        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
      ],
    };
  },
  methods: {
    open(network, card) {
      // this.sharing.title = card.title;
      console.log(network);
      console.log(card);
    },

    async getEvents(){
      await this.$axios.get('/public/events/list').then((response) => {
        this.events = response.data;
        console.log(response.data);
      })
    },

    change(network) {
      console.log(network);
    },
    close(network) {
      console.log(network);
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>
<style>
.bg-image-size * {
  /* background-size: 100% 100%; */
}

.bg-events-size * {
  background-size: 100% 100%;
}
.share-network-list > a {
  flex: none;
  color: #ffffff !important;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
  text-decoration: none !important;
}

.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^="share-network-"] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^="share-network-"] span {
  padding: 0 10px;
  flex: 1 1;
  font-weight: 500;
}
</style>
