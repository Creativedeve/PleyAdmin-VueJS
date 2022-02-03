<template>
  <div>
    <div class="page-actions">
      <h2>Open Media Library</h2>
      <div></div>
      <button
        label="Open Media Library"
        id="cloudinaryML"/>
    </div>
  </div>
</template>

<script>
import GET_CLOUDINARY_SIGNATURE from "@/queries/getCloudinarySignature.gql";

export default {
  async mounted() {
    let cloudinarySignature = await this.$apollo.mutate({
      mutation: GET_CLOUDINARY_SIGNATURE,
    }).catch((error) => {
      console.log("error",error)
      //if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
    });
    cloudinarySignature = cloudinarySignature.data.getCloudinarySignature
    console.log("cloudinarySignature",cloudinarySignature)

    let cloudinaryScript = document.createElement('script')
    cloudinaryScript.setAttribute('src', 'https://media-library.cloudinary.com/global/all.js')
    document.head.appendChild(cloudinaryScript)
    await new Promise(resolve => setTimeout(resolve, 500));

    let cloudinaryConfig = {
      cloud_name: "pley-gg",
      api_key: "195383771587343",
      button_caption: "Open Media Library",
      username: "accounts@pley.gg",
      signature: cloudinarySignature.signature,
      timestamp: cloudinarySignature.timestamp
    }
    
    window.mlImage = cloudinary.createMediaLibrary(cloudinaryConfig, {insertHandler: this.insertImageHandler}, "#cloudinaryML")    
    window.mlImage = cloudinary.openMediaLibrary(cloudinaryConfig, {insertHandler: this.insertImageHandler})    
  },
  methods: {
    insertImageHandler(data){
      return
    },
  },
};
</script>

<style></style>
