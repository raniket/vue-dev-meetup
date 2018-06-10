<template>
  <v-dialog width="350px" persistent v-model="editMeetupDialog">
    <v-btn  class="primary" slot="activator" round >
      <v-icon left>edit</v-icon>
      edit meetup
    </v-btn>
    <v-card >
      <!-- header -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title>
            <h2 headline class="primary--text">Edit Meetup</h2>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <!-- main content -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>
            <v-text-field name="title" id="title" label="Title" required v-model="editedTitle">
            </v-text-field>

            <v-text-field name="description" id="description" 
            label="Description" multi-line rows="4" required v-model="editedDescription">
            </v-text-field>
          </v-card-text>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-layout row wrap>
        <v-flex xs12>
          <v-card-actions>
            <v-btn class="primary--text" round flat @click="editMeetupDialog = false" >Close</v-btn>
            <v-btn class="primary--text" round flat @click="onSaveChanges">Save</v-btn>
          </v-card-actions>
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
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
      }
    },
    methods: {
      onSaveChanges () {
        if(this.editedTitle.trim() === '' || this.editedDescription.trim() === '') return;
        this.editMeetupDialog = false;
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        });
      }
    }
  }
</script>