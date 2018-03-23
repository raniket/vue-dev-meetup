<template>
  <v-container>
    <!-- heading -->
    <v-layout row wrap mb-4>
      <v-flex xs12 class="text-xs-center" >
        <h2 class="text-center" style="color: #FF8F00">Create a new event!</h2>
      </v-flex>
    </v-layout>

    <!-- form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 >
        <form @submit.prevent="onCreateMeetup">

          <!-- title -->
          <v-layout row>
            <v-flex   >
              <v-text-field name="title" id="title" label="Title" required v-model="title" >
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- location -->
          <v-layout row>
            <v-flex  >
              <v-text-field name="location" id="location" label="Location" required v-model="location" >
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- image -->
          <v-layout row>
            <v-flex  >
              <v-text-field  @click="onPickFile" name="imageUrl" id="image-url" label="Upload Image" required v-model="fileName" >
              </v-text-field>
              <!-- <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn> -->
              <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </v-flex>
          </v-layout>

          <!-- image preview -->
          <v-layout row mt-2 mb-4 v-if="imageUrl">
            <v-flex fill-height>
              <v-card>
                <v-card-media
                  class="white--gray"
                  width="100%"
                  height="400px"
                  v-bind:src="imageUrl" >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline">This is the preview of image</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
              </v-card>
            </v-flex>
          </v-layout>

          <!-- description -->
          <v-layout>
            <v-flex  >
              <v-text-field name="description" id="description" 
              label="Description" multi-line rows="4" required v-model="description">
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- date and time picker-->
          <v-layout row mb-3>
            <!-- date picker -->
            <v-flex xs12 mr-1>
              <p class="" style="color: #757575">Pick Date</p>
              <v-date-picker style="height: 390px" v-model="date" ></v-date-picker>
            </v-flex>
            <!-- time picker -->
            <v-flex xs12 >
              <p class="" style="color: #757575" >Pick Time</p>
              <v-time-picker v-model="time" format="24hr" style="height: 390px"></v-time-picker>
            </v-flex>
          </v-layout>

          <!-- button -->
          <v-layout>
            <v-flex>
              <v-btn class="primary" type="submit" round :loading="loading" :disabled="!formIsValid">
                Submit
                <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                </span>
                </v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date(),
        imageUrl: '',
        description: '',
        image: null,

        fileName: '', // to display in file input field.
      }
    },

    computed: {
      formIsValid() {
        return ((this.title !== '') && (this.location !== '') && (this.imageUrl !== '') && (this.description !== ''));
      },
      submittableDateTime() {
        const date = new Date(this.date);
        if(typeof this.time === 'string'){
          const hours = this.time.match(/^(\d+)/)[1];
          const minutes = this.time.match(/:(\d+)/)[1];
          date.setHours(hours);
          date.setMinutes(minutes);
        } else {
          date.setHours(this.time.getHours());
          date.setMinutes(this.time.getMinutes());
        }
        return date;
      },
      loading () {
        return this.$store.getters.loading;
      }

    },

    methods: {
      onCreateMeetup() {

        if(!this.formIsValid) return;
        if(!this.image) return;
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.submittableDateTime.toISOString(), // shout be acceptable by database.
        }
        this.$store.dispatch('createMeetup', meetupData);
        this.$router.push('/meetups');
      },
      onPickFile () {
        this.$refs.fileInput.click();
      },
      onFilePicked (event) {
        const files = event.target.files;
        const filename = files[0].name;
        this.fileName = filename;
        console.log('files: ', files[0]);
        if(filename.lastIndexOf('.') <= 0) {
          return alert('Please upload a valid file');
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result;
        })
        // console.log('base64 of the image: ', this.image);
        this.image = files[0]; // the blob reperesentation of image file.
        console.log('image : ', this.image);
      }
    }
  }
</script>

<style scoped>

</style>
