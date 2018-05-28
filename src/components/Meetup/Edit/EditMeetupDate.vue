<template>
  <v-dialog width="325px" persistent v-model="editMeetupDialog">
    <v-btn  fab class="primary--text ml-3" slot="activator" flat small right depressed >
      <v-icon small>edit</v-icon>
    </v-btn>
    <v-card >
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title>
            <h2 headline class="primary--text">Edit Meetup Date</h2>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <!-- main content -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>
            <v-date-picker  v-model="editableDate" style="width: 100%" action>
              <template > 
                <v-btn class="primary--text" flat @click.native="editMeetupDialog = !editMeetupDialog">
                Cancle</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="primary--text" flat @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
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
        editableDate: null,
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date);

        const newDay = new Date(this.editableDate).getUTCDate();
        const newMonth = new Date(this.editableDate).getUTCMonth();
        const newYear = new Date(this.editableDate).getUTCFullYear();

        newDate.setUTCDate(newDay);
        newDate.setUTCMonth(newMonth);
        newDate.setUTCFullYear(newYear);

        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate,
        });

        this.editMeetupDialog = false;

      }
    },
    created () {
      const forDateComponent = new Date(this.meetup.date).toISOString().split('T')[0];
      this.editableDate = forDateComponent.toString();
    }
  }
</script>