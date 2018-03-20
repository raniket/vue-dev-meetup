<template>
  <v-container >
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 mb-3>
        <h2 style="color: #FF8F00" class="text-sm-center text-xs-center">{{ signUpTitle}}</h2>
      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container >
              <form @submit.prevent="onSignin">
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


              <!-- submit button -->
              <v-layout row>
                <v-flex xs12 >
                  <v-btn type="sumit" class="primary" round :disabled="!formIsValid">Sign In</v-btn>
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
        signUpTitle: 'Login into your account!',
        email: '',
        password: '',
        confirmPassword: '',
      }
    },

    computed: {
      formIsValid () { // for button
        return (this.email !== '' && this.password !== '' && this.isValidLength === true );
      },
      isValidLength () { // for password
        return this.password.length < 6? 'Password should be atleast 6 charachers long' : true;
      },
      user () { // track the change in user state.
        return this.$store.getters.user;
      }
    },
    watch: {
      user (value) { // go to the home page if user state has been changed.
        if(value !== null && value !== undefined) {
          this.$router.push('/');
        } else {
           this.signUpTitle = 'Opps something went wrong!!!';
        }
      }
    }, 
    methods: {
      onSignin() { // sign up button method.
        this.$store.dispatch('signUserIn', { email: this.email, password: this.password});
      }
    }
  }
</script>

<style scoped>

</style>
