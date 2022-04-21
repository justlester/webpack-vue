<template>
    <div>
        Home Page
        <v-btn @click="darkTheme = !darkTheme">
            Toggle theme
        </v-btn>
    </div>
</template>

<script>
export default {
    computed: {
        darkTheme:{
            get(){
                return this.$vuetify.theme.dark;
            },
            set(v){
                this.$vuetify.theme.dark = !!v;
            }
        }
    }
}
</script>