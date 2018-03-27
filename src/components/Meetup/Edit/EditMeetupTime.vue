<template>
  <v-dialog width="350px" persistent v-model="editMeetupDialog">
    <v-btn  class="primary" slot="activator" round >
      <v-icon>edit</v-icon>
      Time
    </v-btn>
    <v-card >
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title>
            <h2 headline class="primary--text">Edit Meetup Time</h2>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <!-- main content -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>
            <v-time-picker  v-model="editableTime" format="24hr" style="width: 100%" action>
              <template > 
                <v-btn class="primary--text" flat @click.native="editMeetupDialog = !editMeetupDialog">
                Cancle</v-btn>
                <v-btn class="primary--text" flat @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editMeetupDialog: false,
        editableTime: null,
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date);

        const hours = this.editableTime.match(/^(\d+)/)[1];
        const minutes = this.editableTime.match(/:(\d+)/)[1];
        newDate.setHours(hours);
        newDate.setMinutes(minutes);

        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate,
        });

        this.editMeetupDialog = false;

      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date);
    }
  }
</script>