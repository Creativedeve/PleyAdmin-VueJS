<template>
  <div>
    <div class="page-actions">
      <h2>Update team</h2>
      <div></div>
    </div>
    <div v-if="team">
      <div class="sheet">
        <h3>{{ team.name }}</h3>
        <FormulateInput
          v-model="team.description"
          label="Description"
          name="description"
          type="textarea"
        />
      <div>
        <FormulateInput
          label="Logo"
          v-model="team.logo"
          type="hidden"
          name="logo"
        />
        <span v-if="this.logoSrc"><img :src="this.logoSrc" width="200"/></span>
        <span v-if="!this.logoSrc">No logo selected</span>
        <span>
          <FormulateInput
            type="button"
            label="Choose logo"
            id="cloudinaryML"/>
        </span>
        <br/><br/>
      </div>

        <div><button @click="saveTeam" class="main">Save</button></div>
        <div><button @click="deleteTeam" class="delete">Delete</button></div>
        <br/><br/>
      </div>

      <h3>Achievements</h3>
      <div><vue-good-table
        :search-options="{ enabled: true }"
        :sort-options="{
          enabled: true,
          initialSortBy: { field: 'title', type: 'asc' }
        }"
        :columns="columns"
        :rows="team.achievements"
        @on-row-click="rowClick"
      /></div>
      <div><button style="margin-top:1.5em" @click="createTeamAchievement" class="main">Add achievement</button></div>
    </div>
  </div>
</template>

<script>
import GET_TEAM from "@/queries/getTeam.gql";
import UPDATE_TEAM from "@/queries/updateTeam.gql";
import DELETE_TEAM_ACHIEVEMENT from "@/queries/deleteTeamAchievement.gql";
import GET_CLOUDINARY_SIGNATURE from "@/queries/getCloudinarySignature.gql";
import GET_TEAMS from "@/queries/getTeams.gql";
import DELETE_TEAM from "@/queries/deleteTeam.gql";

export default {
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    logoSrc: function() {
      if (this.team.logo) {
        console.log(this.team.logo)
        return `https://res.cloudinary.com/pley-gg/image/upload/w_200/${this.team.logo.publicId}`
      }
      return null
    },
  },
  data() {
    return {
      columns: [
        {
          label: "Rank",
          field: 'rank'
        },
        {
          label: "Title",
          field: 'title',
        },
        {
          label: "Date",
          field: this.renderAchievedAt
        },
      ]
    };
  },
  methods: {
    insertImageHandler(data){
      const image = data.assets[0]
      this.team.logo = {
        source: 'cloudinary',
        publicId: image.public_id,
        format: image.format,
        originalWidth: image.width,
        originalHeight: image.height,
        alt: image.context?.custom?.alt,
        caption: image.context?.custom?.caption
      }
    },
    renderAchievedAt(rowObj) {
      return this.timestampToDate(rowObj.achievedAt)
    },
    saveTeam() {
      const localeDescription = (this.team.description) ? { en: this.team.description } : { en: 'No description' }
      this.$apollo.mutate({
        mutation: UPDATE_TEAM,
        variables: {
          id: this.team.id,
          localeDescription: localeDescription,
          logo: this.team.logo
        },
      }).then((data) => {
          this.$store.dispatch("addToast", {
            type: "good",
            message: "Team updated!",
          });
      }).catch((error) => {
          this.$store.dispatch("addToast", {
            type: "bad",
            message: "Team update failed!",
          });
        //if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      });
    },
    rowClick({ row }) {
      const path = `/teams/${this.team.id}/achievements/${row.id}`
      this.$router.push({ path });
    },
    createTeamAchievement() {
      console.log("createTeamAchievement")
      this.$router.push({ path: "/teams/" + this.team.id + '/achievements/create' });
    },
    deleteTeam() {
      if (!confirm("Delete this team?")) return;
      this.$apollo.mutate({
        mutation: DELETE_TEAM,
        variables: {
          id: this.id,
        },
        update: (data) => {
          console.log(data);
          this.$router.push({ path: "/teams" });
        },
        error (error) {
          if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
        },
        refetchQueries: [{ query: GET_TEAMS }],
      });
    },
  },
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
      button_caption: "Choose image",
      username: "accounts@pley.gg",
      signature: cloudinarySignature.signature,
      timestamp: cloudinarySignature.timestamp
    }
    
    window.mlImage = cloudinary.createMediaLibrary(cloudinaryConfig, {insertHandler: this.insertImageHandler}, "#cloudinaryML")  

  },
  apollo: {
    team: {
      query: GET_TEAM,
      variables() {
        return this.$props;
      },
      update(data) {
        let team = data.getTeam
        delete team.logo?.__typename
        delete team.__typename
        //article.publishedAt = this.timestampToFormDateTime(article.publishedAt)
        return team;
      },
      error (error) {
        if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      },
    },
  },
};
</script>

<style></style>
