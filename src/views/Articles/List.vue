<template>
  <div>
    <div class="page-actions">
      <h2>News</h2>
      <div>
        <router-link to="/articles/create" tag="button" @click="addArticle">Create news</router-link>
      </div>
    </div>
    <vue-good-table
      v-if="articles"
      :search-options="{ enabled: true }"
      :sort-options="{
        enabled: false,
      }"
      :columns="columns"
      :rows="articles"
      @on-row-click="rowClick"
      @on-cell-click="cellClick"/>
    <div class="listNavigation"><button v-if="hasMore && !loading" @click="listArticles">Load more</button></div>
  </div>
</template>

<script>
import { getArticles as GET_ARTICLES } from "@/queries/getArticles.gql";
import moment from 'moment'

export default {
  name: "Articles",
  data() {
    return {
      articles: [],
      hasMore: false,
      page: 1,
      loading: false,
      pagination: {
        after: null,
        limit: 25
      },
      columns: [
        {
          label: "Title",
          field: this.renderTitle,
          html: true,
        },
        {
          label: "Publish Time",
          field: this.renderPublishTime
        },
        {
          label: "Actions",
          field: this.renderActions,
          html: true
        },
      ]
    };
  },
  mounted() {
    this.listArticles()
  },
  methods: {
    addArticle() {},
    renderActions(rowObj) {
      let link
      const now = parseFloat(moment().format('x'))
      if (rowObj.status == "DRAFT" || rowObj.publishedAt > now) {        
        //const url = `https://pleygatsbypwastaging.gtsb.io/news/preview?id=${rowObj.id}&previewToken=${rowObj.previewToken}`
        const url = `https://pley.gg/news/preview?id=${rowObj.id}&previewToken=${rowObj.previewToken}`
        link = `<a href='${url}' target='_blank'>Preview</a>`
      } else if (rowObj.status == "PUBLISHED" && rowObj.publishedAt <= now) {
        //const url = `https://pleygatsbypwastaging.gtsb.io/news/${rowObj.slug}`
        const url = `https://pley.gg/news/${rowObj.slug}`
        link = `<a href='${url}' target='_blank'>View on site</a>`
      } 
      return link
    },
    renderTitle(rowObj) {
      const priority = this.renderPriority(rowObj);
      let status = ''
      if (rowObj.status == "DRAFT") status = "<span class='draft'>DRAFT</span> ";
      if (rowObj.status == "PUBLISHED") status = "<span class='published'>PUBLISHED</span> ";
      let content = status + priority + rowObj.title
      return content
    },
    renderPublishTime(rowObj) {
      return this.timestampToDateTime(rowObj.publishedAt)
    },
    renderPriority(rowObj) {
      if (rowObj.priority == "BREAKING") return "<span class='breaking'>BREAKING</span> "
      if (rowObj.priority == "TOP_STORY") return "<span class='topstory'>TOP STORY</span> "
      return ''
    },
    edit(row) {
      this.$router.push({ path: "/articles/" + row.id });
    },
    rowClick({ row }) {
      return
    },
    cellClick(params) {
      if (params.column.label != "Actions") {
        this.edit(params.row)
      }
    },
    columnClick({ column }) {
      console.log("column",column)
    },
    listArticles(page) {
      this.loading = true
      this.$apollo.query({
        query: GET_ARTICLES,
        variables: {
          pagination: this.pagination
        }
      }).then((data) => {
        const getArticles = data.data.getArticles
        this.pagination.after = getArticles.paginationInfo.cursor
        this.hasMore = getArticles.paginationInfo.hasMore
        this.articles = this.articles.concat(getArticles.articles);
        this.loading = false
      }).catch((error) => {
        //if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      });
    }
  },
};
</script>

<style >

.draft {
  background-color:#c50000;
  color:#fff;
  font-weight:bold;
  padding: 0 0.5em;
  margin-right: 0.5em;
}

.published {
  background-color:#33b500;
  color:#fff;
  font-weight:bold;
  padding: 0 0.5em;
  margin-right: 0.5em;
}

.breaking {
  background-color:#ffc800;
  color:#000;
  font-weight:bold;
  padding: 0 0.5em;
  margin-right: 0.5em;
}

.topstory {
  background-color:#002aff;
  color:#fff;
  font-weight:bold;
  padding: 0 0.5em;
  margin-right: 0.5em;
}
</style>
