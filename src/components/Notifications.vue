<template>
  <div>
    <article v-for="(notif, index) in notifications" class="message" :class='"is-" + notif.level' @click="discard(index)">
      <div class="message-body">{{notif.text}}</div>
    </article>
  </div>
</template>

<script>
  export default {
    props: {
      messages: {
        default() {
          return [];
        }
      }
    },

    data() {
      return {
        notifications: this.messages
      };
    },

    methods : {
      discard(index) {
        this.notifications.splice(index, 1);
      }
    }
  }
</script>