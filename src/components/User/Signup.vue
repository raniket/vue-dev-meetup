<template>
  <v-container >
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 mb-3>
        <h2 style="color: #FF8F00" class="text-sm-center text-xs-center">{{ signUpTitle}}</h2>
      </v-flex>
    </v-layout>

    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <!-- <app-alert @dismissed="onDismissed" :text="error"></app-alert> -->
        <app-signup-alert @dismissed="onDismissed" :text="error"></app-signup-alert>
      </v-flex>
    </v-layout>

    <v-layout row >
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container >
              <form @submit.prevent="onSignup">
                <!-- email -->
                <v-layout  row>
                  <v-flex xs12>
                    <v-text-field
                      type="email" 
                      name="email" 
                      id="email" 
                      v-model="email" 
                      label="Your Email" 
                      required >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <!-- password -->
                <v-layout row>
                  <v-flex xs12 >
                    <v-text-field 
                      type="password"  
                      name="password" 
                      id="password" 
                      v-model="password" 
                      label="Your Password"
                      :rules="[isValidLength]"
                      required >
                      </v-text-field>
                  </v-flex>
                </v-layout>

                <!-- confirm password -->
                <v-layout row>
                  <v-flex xs12 >
                    <v-text-field 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    v-model="confirmPassword" 
                    label="Confirm Password" 
                    :rules="[comparePassword]"
                    required >
                    </v-text-field>
                  </v-flex>
                </v-layout>

              <!-- submit button -->
              <v-layout row>
                <v-flex xs12 >
                  <v-btn type="sumit" class="primary" round :loading="loading" :disabled="!formIsValid">
                    Sign up
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    </v-btn>
                </v-flex>
              </v-layout>

              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        signUpTitle: 'Let\'s create a new account!',
        email: '',
        password: '',
        confirmPassword: '',
      }
    },

    computed: {
      formIsValid () { // for button
        return (this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.isValidLength === true && this.comparePassword === true && this.loading === false);
      },
      isValidLength () { // for password
        return this.password.length < 6? 'Password should be atleast 6 charachers long' : true;
      },
      comparePassword () { // for confirm password
        return this.password !== this.confirmPassword? 'Password do not match' : true;
      },
      user () { // track the change in user state.
        return this.$store.getters.user;
      },
      loading () {
        return this.$store.getters.loading;
      },
      error () {
        return this.$store.getters.error;
      }
    },
    watch: {
      user (value) { // go to the home page if user state has been changed.
        if(value !== null && value !== undefined) {
          console.log('inside watch if');
          this.$router.push('/');
        } else {
           this.signUpTitle = 'Opps something went wrong!!!';
        }
      }
    }, 
    methods: {
      onSignup() { // sign up button method.
        this.$store.dispatch('signUserUp', { email: this.email, password: this.password});
      },
      onDismissed () {
        this.$store.dispatch('clearError');
      }
    }
  }
</script>

<style scoped >
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }


</style>
