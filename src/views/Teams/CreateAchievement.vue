<template>
  <div>
    <div class="page-actions">
      <h2>Add achievement</h2>
      <div></div>
    </div>
    <FormulateForm @submit="submit" v-model="form">
      <FormulateInput
          v-model="form.title"
          label="Title"
          name="title"
          validation="required"
          error-behavior="live"
        />
        <FormulateInput
          v-model="form.rank"
          label="Rank"
          name="rank"
          validation="required"
          error-behavior="live"
          :options="{1: 'Winner', 2: 'Runner-up'}"
          type="radio"
        />
        <FormulateInput
          type="date"
          v-model="form.achievedAt"
          name="achievedAt"
          label="Date of achievement"
          validation="required|after:2013-01-01"
          min="2013-01-01"
          max="2040-01-01"
          error-behavior="live"
        />

      <FormulateInput type="submit" label="Create" />
    </FormulateForm>
  </div>
</template>

<script>
import CREATE_TEAM_ACHIEVEMENT from "@/queries/createTeamAchievement.gql";

export default {
  props: {
    id: {
      type: String,
    },
    teamId: {
      type: String,
    },
  },
  data() {
    return {
      form: {
        title: null,
        rank: null,
        achievedAt: null
      },
    };
  },
  methods: {
    submit() {
      const { title, rank } = this.form;      
      const achievedAt = this.dateToTimestamp(this.form.achievedAt);
      this.$apollo.mutate({
        mutation: CREATE_TEAM_ACHIEVEMENT,
        variables: {
          id: this.id,
          teamId: this.teamId,
          title,
          rank: parseInt(rank),
          achievedAt
        },
      }).then((data) => {
        this.$router.push({ path: "/teams/"+this.teamId });
        console.log(data)        
          /*
          this.$store.dispatch("addToast", {
            type: "good",
            message: "Article created!",
          });
          */
      }).catch((error) => {
        if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      });
    },
  },
};
</script>

<style></style>
