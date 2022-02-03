<template>
  <div>
    <div class="page-actions">
      <h2>Update team achievement</h2>

      <div></div>
    </div>
    <div v-if="team">
      <div class="sheet">
        <h3>{{ team.name }}: {{ team.achievement.title }}</h3>
        <FormulateInput
          v-model="team.achievement.title"
          label="Title"
          name="title"
        />
        <FormulateInput
          v-model="team.achievement.rank"
          label="Rank"
          name="rank"
          :options="{1: 'Winner', 2: 'Runner-up'}"
          type="radio"
        />
        <FormulateInput
          type="date"
          name="achievedAt"
          v-model="team.achievement.achievedAt"
          label="Date of achievement"
          validation="required|after:2013-01-01"
          min="2013-01-01"
          max="2040-01-01"
          error-behavior="live"
        />
        <div><button @click="saveAchievement" class="main">Save</button></div>
        <div><button @click="deleteAchievement" class="delete">Delete</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import GET_TEAM from "@/queries/getTeam.gql";
import UPDATE_TEAM_ACHIEVEMENT from "@/queries/updateTeamAchievement.gql";
import DELETE_TEAM_ACHIEVEMENT from "@/queries/deleteTeamAchievement.gql";

export default {
  props: {
    id: {
      type: String,
    },
    teamId: {
      type: String,
    },
  },
  methods: {
    saveAchievement() {
      console.log(this.team.achievement.achievedAt)
      const achievedAt = this.dateToTimestamp(this.team.achievement.achievedAt);
      console.log(achievedAt)
      this.$apollo.mutate({
        mutation: UPDATE_TEAM_ACHIEVEMENT,
        variables: {
          id: this.team.achievement.id,
          teamId: this.team.id,
          rank: this.team.achievement.rank,
          title: this.team.achievement.title,
          achievedAt
        },
      }).then((data) => {
        const path = `/teams/${this.teamId}`
        this.$router.push({ path });
      }).catch((error) => {
        // Error
        console.error(error)
        // We restore the initial user input
      });
    },
    deleteAchievement() {
      if (!confirm("Delete this achievement?")) return;
      this.$apollo.mutate({
        mutation: DELETE_TEAM_ACHIEVEMENT,
        variables: {
          id: this.$props.id,
          teamId: this.$props.teamId,
        },
      }).then((data) => {
        const path = `/teams/${this.teamId}`
        this.$router.push({ path });
      }).catch((error) => {
        if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      });
    },
  },
  apollo: {
    team: {
      query: GET_TEAM,
      variables() {
        return { id: this.$props.teamId }
      },
      update(data) {
        let team = data.getTeam.team
        let achievement
        team.achievements.forEach(element => {
          if (element.id == this.id) {
            team.achievement = element
          }
        });

        team.achievement.achievedAt = this.timestampToFormDate(team.achievement.achievedAt)
        return team;
      },
    },
  },
};
</script>

<style></style>
