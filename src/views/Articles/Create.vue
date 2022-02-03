<template>
  <div>
    <div class="page-actions">
      <h2>Create news</h2>
      <div></div>
    </div>
    <FormulateForm @submit="submit" v-model="form">
      <FormulateInput 
        label="Title" 
        name="title" 
        error-behavior="live"
        validation="required"
        :validation-messages="{
          matches: 'Title is required'
        }"/>
      <FormulateInput 
        label="Teaser" 
        name="teaser"
        type="textarea" 
        error-behavior="live"
        validation="required"
        :validation-messages="{
          matches: 'Teaser is required'
        }"/>

      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <img src="/assets/images/icons/bold.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <img src="/assets/images/icons/italic.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <img src="/assets/images/icons/strike.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            
            <img src="/assets/images/icons/paragraph.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <img src="/assets/images/icons/ol.svg" />
          </button>

          <button id="cloudinaryEditorML"
            @click="commands.image">
            <img src="/assets/images/icons/image.svg" />
          </button>


          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >            
            <img src="/assets/images/icons/ul.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <img src="/assets/images/icons/quote.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <img src="/assets/images/icons/code.svg" width="24" />
          </button>

          <button
            class="menubar__button"
            @click="commands.undo"
          >
            <img src="/assets/images/icons/undo.svg" />
          </button>

          <button
            class="menubar__button"
            @click="commands.redo"
          >
            <img src="/assets/images/icons/redo.svg" />
          </button>
          <button
          class="menubar__button"
          @click="show()"
        >
            <img src="/assets/images/icons/add_country_flag.svg" />
        </button>
        <button
          class="menubar__button"
          @click="addYoutubeToEditor()"
        >
            <img src="/assets/images/icons/yt.svg" />
        </button>

        <button
          class="menubar__button"
          @click="addTwitchChannelToEditor()"
        >
            <img src="/assets/images/icons/twitch.svg" />
        </button>
        <button
          class="menubar__button"
          @click="addTwitchVideoToEditor()"
        >
            <img src="/assets/images/icons/twitch.svg" />
        </button>
        <button
          class="menubar__button"
          @click="addTwitchClipToEditor()"
        >
            <img src="/assets/images/icons/twitch.svg" />
        </button>

        <button
          class="menubar__button"
          @click="addTweetToEditor()"
        >
            <img src="/assets/images/icons/twitter.svg" />
        </button>

        <button
          class="menubar__button"
          @click="showLinkURL()"
        >
            <img src="/assets/images/icons/link.svg" />
        </button>
<button
          class="menubar__button"
          @click="showSlugReadMore()"
        >
            <img src="/assets/images/icons/read_more.svg" />
        </button>
        
        
        </div>
      </editor-menu-bar>



      <editor-content class="editor__content" :editor="editor" />

      <FormulateInput 
        v-model="body"
        type="hidden"
        name="body" 
        error-behavior="live"
        validation="required"
        :validation-messages="{
          matches: 'Body text is required'
        }"/>

      <div>
        <FormulateInput
          label="Image"
          validation="required"
          error-behavior="live"
          type="hidden"
          name="image"
        />
        <span v-if="form.image"><img :src="this.imageSrc"/></span>
        <span v-if="!form.image">No image selected</span>
        <span>
          <FormulateInput
            type="button"
            label="Choose image"
            id="cloudinaryML"/>
        </span>
        <br/><br/>
      </div>
      
      <FormulateInput
        type="group"
        name="playerIds"
        :repeatable="true"
        label="Players"
        add-label="+ Add player"
      >
        <div class="player">
          <FormulateInput
            type="autocomplete"
            name="id"
            :options="playerOptions"
          />  
        </div>
      </FormulateInput>


      <FormulateInput
        type="group"
        name="teamIds"
        :repeatable="true"
        label="Teams"
        add-label="+ Add team"
      >
        <div class="team">
          <FormulateInput
            type="autocomplete"
            name="id"
            :options="teamOptions"
          />  
        </div>
      </FormulateInput>

      <FormulateInput

        name="priority"
        label="Priority"
        type="radio"
        :options="{'DEFAULT':'Default','TOP_STORY':'Top story','BREAKING':'Breaking'}"
      />
      <FormulateInput
        name="status"
        label="Status"
        type="radio"
        :options="{'DRAFT':'Draft','PUBLISHED':'Published'}"
      />
      <FormulateInput
        type="datetime-local"
        name="publishedAt"
        label="Publish Time"
        validation="required"
      />
      <FormulateInput type="submit" label="Create" />
    </FormulateForm>
    <modal name="my-first-modal">
        <div>
           <h5>Select Country</h5>
          <FormulateInput
  type="select"
  name="country"
  id="country" 
  :options="[
  {'label': 'Albania', 'value': 'AL'},
  {'label': 'Åland Islands', 'value': 'AX'},
  {'label': 'Algeria', 'value': 'DZ'},
  {'label': 'American Samoa', 'value': 'AS'},
  {'label': 'Andorra', 'value': 'AD'},
  {'label': 'Angola', 'value': 'AO'},
  {'label': 'Anguilla', 'value': 'AI'},
  {'label': 'Antarctica', 'value': 'AQ'},
  {'label': 'Antigua and Barbuda', 'value': 'AG'},
  {'label': 'Argentina', 'value': 'AR'},
  {'label': 'Armenia', 'value': 'AM'},
  {'label': 'Aruba', 'value': 'AW'},
  {'label': 'Australia', 'value': 'AU'},
  {'label': 'Austria', 'value': 'AT'},
  {'label': 'Azerbaijan', 'value': 'AZ'},
  {'label': 'Bahamas (the)', 'value': 'BS'},
  {'label': 'Bahrain', 'value': 'BH'},
  {'label': 'Bangladesh', 'value': 'BD'},
  {'label': 'Barbados', 'value': 'BB'},
  {'label': 'Belarus', 'value': 'BY'},
  {'label': 'Belgium', 'value': 'BE'},
  {'label': 'Belize', 'value': 'BZ'},
  {'label': 'Benin', 'value': 'BJ'},
  {'label': 'Bermuda', 'value': 'BM'},
  {'label': 'Bhutan', 'value': 'BT'},
  {'label': 'Bolivia (Plurinational State of)', 'value': 'BO'},
  {'label': 'Bonaire, Sint Eustatius and Saba', 'value': 'BQ'},
  {'label': 'Bosnia and Herzegovina', 'value': 'BA'},
  {'label': 'Botswana', 'value': 'BW'},
  {'label': 'Bouvet Island', 'value': 'BV'},
  {'label': 'Brazil', 'value': 'BR'},
  {'label': 'British Indian Ocean Territory (the)', 'value': 'IO'},
  {'label': 'Brunei Darussalam', 'value': 'BN'},
  {'label': 'Bulgaria', 'value': 'BG'},
  {'label': 'Burkina Faso', 'value': 'BF'},
  {'label': 'Burundi', 'value': 'BI'},
  {'label': 'Cabo Verde', 'value': 'CV'},
  {'label': 'Cambodia', 'value': 'KH'},
  {'label': 'Cameroon', 'value': 'CM'},
  {'label': 'Canada', 'value': 'CA'},
  {'label': 'Cayman Islands (the)', 'value': 'KY'},
  {'label': 'Central African Republic (the)', 'value': 'CF'},
  {'label': 'Chad', 'value': 'TD'},
  {'label': 'Chile', 'value': 'CL'},
  {'label': 'China', 'value': 'CN'},
  {'label': 'Christmas Island', 'value': 'CX'},
  {'label': 'Cocos (Keeling) Islands (the)', 'value': 'CC'},
  {'label': 'Colombia', 'value': 'CO'},
  {'label': 'Comoros (the)', 'value': 'KM'},
  {'label': 'Congo (the Democratic Republic of the)', 'value': 'CD'},
  {'label': 'Congo (the)', 'value': 'CG'},
  {'label': 'Cook Islands (the)', 'value': 'CK'},
  {'label': 'Costa Rica', 'value': 'CR'},
  {'label': 'Croatia', 'value': 'HR'},
  {'label': 'Cuba', 'value': 'CU'},
  {'label': 'Curaçao', 'value': 'CW'},
  {'label': 'Cyprus', 'value': 'CY'},
  {'label': 'Czechia', 'value': 'CZ'},
  {'label': 'Côte d Ivoire', 'value': 'CI'},
  {'label': 'Denmark', 'value': 'DK'},
  {'label': 'Djibouti', 'value': 'DJ'},
  {'label': 'Dominica', 'value': 'DM'},
  {'label': 'Dominican Republic (the)', 'value': 'DO'},
  {'label': 'Ecuador', 'value': 'EC'},
  {'label': 'Egypt', 'value': 'EG'},
  {'label': 'El Salvador', 'value': 'SV'},
  {'label': 'Equatorial Guinea', 'value': 'GQ'},
  {'label': 'Eritrea', 'value': 'ER'},
  {'label': 'Estonia', 'value': 'EE'},
  {'label': 'Eswatini', 'value': 'SZ'},
  {'label': 'Ethiopia', 'value': 'ET'},
  {'label': 'Falkland Islands (the) [Malvinas]', 'value': 'FK'},
  {'label': 'Faroe Islands (the)', 'value': 'FO'},
  {'label': 'Fiji', 'value': 'FJ'},
  {'label': 'Finland', 'value': 'FI'},
  {'label': 'France', 'value': 'FR'},
  {'label': 'French Guiana', 'value': 'GF'},
  {'label': 'French Polynesia', 'value': 'PF'},
  {'label': 'French Southern Territories (the)', 'value': 'TF'},
  {'label': 'Gabon', 'value': 'GA'},
  {'label': 'Gambia (the)', 'value': 'GM'},
  {'label': 'Georgia', 'value': 'GE'},
  {'label': 'Germany', 'value': 'DE'},
  {'label': 'Ghana', 'value': 'GH'},
  {'label': 'Gibraltar', 'value': 'GI'},
  {'label': 'Greece', 'value': 'GR'},
  {'label': 'Greenland', 'value': 'GL'},
  {'label': 'Grenada', 'value': 'GD'},
  {'label': 'Guadeloupe', 'value': 'GP'},
  {'label': 'Guam', 'value': 'GU'},
  {'label': 'Guatemala', 'value': 'GT'},
  {'label': 'Guernsey', 'value': 'GG'},
  {'label': 'Guinea', 'value': 'GN'},
  {'label': 'Guinea-Bissau', 'value': 'GW'},
  {'label': 'Guyana', 'value': 'GY'},
  {'label': 'Haiti', 'value': 'HT'},
  {'label': 'Heard Island and McDonald Islands', 'value': 'HM'},
  {'label': 'Holy See (the)', 'value': 'VA'},
  {'label': 'Honduras', 'value': 'HN'},
  {'label': 'Hong Kong', 'value': 'HK'},
  {'label': 'Hungary', 'value': 'HU'},
  {'label': 'Iceland', 'value': 'IS'},
  {'label': 'India', 'value': 'IN'},
  {'label': 'Indonesia', 'value': 'ID'},
  {'label': 'Iran (Islamic Republic of)', 'value': 'IR'},
  {'label': 'Iraq', 'value': 'IQ'},
  {'label': 'Ireland', 'value': 'IE'},
  {'label': 'Isle of Man', 'value': 'IM'},
  {'label': 'Israel', 'value': 'IL'},
  {'label': 'Italy', 'value': 'IT'},
  {'label': 'Jamaica', 'value': 'JM'},
  {'label': 'Japan', 'value': 'JP'},
  {'label': 'Jersey', 'value': 'JE'},
  {'label': 'Jordan', 'value': 'JO'},
  {'label': 'Kazakhstan', 'value': 'KZ'},
  {'label': 'Kenya', 'value': 'KE'},
  {'label': 'Kiribati', 'value': 'KI'},
  {'label': 'Korea (the Democratic Peoples Republic of)', 'value': 'KP'},
  {'label': 'Korea (the Republic of)', 'value': 'KR'},
  {'label': 'Kuwait', 'value': 'KW'},
  {'label': 'Kyrgyzstan', 'value': 'KG'},
  {'label': 'Lao Peoples Democratic Republic (the)', 'value': 'LA'},
  {'label': 'Latvia', 'value': 'LV'},
  {'label': 'Lebanon', 'value': 'LB'},
  {'label': 'Lesotho', 'value': 'LS'},
  {'label': 'Liberia', 'value': 'LR'},
  {'label': 'Libya', 'value': 'LY'},
  {'label': 'Liechtenstein', 'value': 'LI'},
  {'label': 'Lithuania', 'value': 'LT'},
  {'label': 'Luxembourg', 'value': 'LU'},
  {'label': 'Macao', 'value': 'MO'},
  {'label': 'Madagascar', 'value': 'MG'},
  {'label': 'Malawi', 'value': 'MW'},
  {'label': 'Malaysia', 'value': 'MY'},
  {'label': 'Maldives', 'value': 'MV'},
  {'label': 'Mali', 'value': 'ML'},
  {'label': 'Malta', 'value': 'MT'},
  {'label': 'Marshall Islands (the)', 'value': 'MH'},
  {'label': 'Martinique', 'value': 'MQ'},
  {'label': 'Mauritania', 'value': 'MR'},
  {'label': 'Mauritius', 'value': 'MU'},
  {'label': 'Mayotte', 'value': 'YT'},
  {'label': 'Mexico', 'value': 'MX'},
  {'label': 'Micronesia (Federated States of)', 'value': 'FM'},
  {'label': 'Moldova (the Republic of)', 'value': 'MD'},
  {'label': 'Monaco', 'value': 'MC'},
  {'label': 'Mongolia', 'value': 'MN'},
  {'label': 'Montenegro', 'value': 'ME'},
  {'label': 'Montserrat', 'value': 'MS'},
  {'label': 'Morocco', 'value': 'MA'},
  {'label': 'Mozambique', 'value': 'MZ'},
  {'label': 'Myanmar', 'value': 'MM'},
  {'label': 'Namibia', 'value': 'NA'},
  {'label': 'Nauru', 'value': 'NR'},
  {'label': 'Nepal', 'value': 'NP'},
  {'label': 'Netherlands (the)', 'value': 'NL'},
  {'label': 'New Caledonia', 'value': 'NC'},
  {'label': 'New Zealand', 'value': 'NZ'},
  {'label': 'Nicaragua', 'value': 'NI'},
  {'label': 'Niger (the)', 'value': 'NE'},
  {'label': 'Nigeria', 'value': 'NG'},
  {'label': 'Niue', 'value': 'NU'},
  {'label': 'Norfolk Island', 'value': 'NF'},
  {'label': 'Northern Mariana Islands (the)', 'value': 'MP'},
  {'label': 'Norway', 'value': 'NO'},
  {'label': 'Oman', 'value': 'OM'},
  {'label': 'Pakistan', 'value': 'PK'},
  {'label': 'Palau', 'value': 'PW'},
  {'label': 'Palestine, State of', 'value': 'PS'},
  {'label': 'Panama', 'value': 'PA'},
  {'label': 'Papua New Guinea', 'value': 'PG'},
  {'label': 'Paraguay', 'value': 'PY'},
  {'label': 'Peru', 'value': 'PE'},
  {'label': 'Philippines (the)', 'value': 'PH'},
  {'label': 'Pitcairn', 'value': 'PN'},
  {'label': 'Poland', 'value': 'PL'},
  {'label': 'Portugal', 'value': 'PT'},
  {'label': 'Puerto Rico', 'value': 'PR'},
  {'label': 'Qatar', 'value': 'QA'},
  {'label': 'Republic of North Macedonia', 'value': 'MK'},
  {'label': 'Romania', 'value': 'RO'},
  {'label': 'Russian Federation (the)', 'value': 'RU'},
  {'label': 'Rwanda', 'value': 'RW'},
  {'label': 'Réunion', 'value': 'RE'},
  {'label': 'Saint Barthélemy', 'value': 'BL'},
  {'label': 'Saint Helena, Ascension and Tristan da Cunha', 'value': 'SH'},
  {'label': 'Saint Kitts and Nevis', 'value': 'KN'},
  {'label': 'Saint Lucia', 'value': 'LC'},
  {'label': 'Saint Martin (French part)', 'value': 'MF'},
  {'label': 'Saint Pierre and Miquelon', 'value': 'PM'},
  {'label': 'Saint Vincent and the Grenadines', 'value': 'VC'},
  {'label': 'Samoa', 'value': 'WS'},
  {'label': 'San Marino', 'value': 'SM'},
  {'label': 'Sao Tome and Principe', 'value': 'ST'},
  {'label': 'Saudi Arabia', 'value': 'SA'},
  {'label': 'Senegal', 'value': 'SN'},
  {'label': 'Serbia', 'value': 'RS'},
  {'label': 'Seychelles', 'value': 'SC'},
  {'label': 'Sierra Leone', 'value': 'SL'},
  {'label': 'Singapore', 'value': 'SG'},
  {'label': 'Sint Maarten (Dutch part)', 'value': 'SX'},
  {'label': 'Slovakia', 'value': 'SK'},
  {'label': 'Slovenia', 'value': 'SI'},
  {'label': 'Solomon Islands', 'value': 'SB'},
  {'label': 'Somalia', 'value': 'SO'},
  {'label': 'South Africa', 'value': 'ZA'},
  {'label': 'South Georgia and the South Sandwich Islands', 'value': 'GS'},
  {'label': 'South Sudan', 'value': 'SS'},
  {'label': 'Spain', 'value': 'ES'},
  {'label': 'Sri Lanka', 'value': 'LK'},
  {'label': 'Sudan (the)', 'value': 'SD'},
  {'label': 'Suriname', 'value': 'SR'},
  {'label': 'Svalbard and Jan Mayen', 'value': 'SJ'},
  {'label': 'Sweden', 'value': 'SE'},
  {'label': 'Switzerland', 'value': 'CH'},
  {'label': 'Syrian Arab Republic', 'value': 'SY'},
  {'label': 'Taiwan (Province of China)', 'value': 'TW'},
  {'label': 'Tajikistan', 'value': 'TJ'},
  {'label': 'Tanzania, United Republic of', 'value': 'TZ'},
  {'label': 'Thailand', 'value': 'TH'},
  {'label': 'Timor-Leste', 'value': 'TL'},
  {'label': 'Togo', 'value': 'TG'},
  {'label': 'Tokelau', 'value': 'TK'},
  {'label': 'Tonga', 'value': 'TO'},
  {'label': 'Trinidad and Tobago', 'value': 'TT'},
  {'label': 'Tunisia', 'value': 'TN'},
  {'label': 'Turkey', 'value': 'TR'},
  {'label': 'Turkmenistan', 'value': 'TM'},
  {'label': 'Turks and Caicos Islands (the)', 'value': 'TC'},
  {'label': 'Tuvalu', 'value': 'TV'},
  {'label': 'Uganda', 'value': 'UG'},
  {'label': 'Ukraine', 'value': 'UA'},
  {'label': 'United Arab Emirates (the)', 'value': 'AE'},
  {'label': 'United Kingdom of Great Britain and Northern Ireland (the)', 'value': 'GB'},
  {'label': 'United States Minor Outlying Islands (the)', 'value': 'UM'},
  {'label': 'United States of America (the)', 'value': 'US'},
  {'label': 'Uruguay', 'value': 'UY'},
  {'label': 'Uzbekistan', 'value': 'UZ'},
  {'label': 'Vanuatu', 'value': 'VU'},
  {'label': 'Venezuela (Bolivarian Republic of)', 'value': 'VE'},
  {'label': 'Viet Nam', 'value': 'VN'},
  {'label': 'Virgin Islands (British)', 'value': 'VG'},
  {'label': 'Virgin Islands (U.S.)', 'value': 'VI'},
  {'label': 'Wallis and Futuna', 'value': 'WF'},
  {'label': 'Western Sahara', 'value': 'EH'},
  {'label': 'Yemen', 'value': 'YE'},
  {'label': 'Zambia', 'value': 'ZM'},
  {'label': 'Zimbabwe', 'value': 'ZW'}
]"
/>
        <div class="flex">
           <FormulateInput
            type="button"
            label="Ok"
            @click="addCountryFlag()"
            />
            
          <FormulateInput
            type="button"
            class="pdl10"
            label="Cancel"
            @click="hide()"
            />
           
        </div>
        </div>
        
    </modal>
   
	 <modal name="linkURL-modal">
        <div>
          <FormulateInput
          label="Enter the full link url here"		  
          type="text"
		  name="linkURL"
		  id="linkURL" 
         />
		 <FormulateInput
      type="checkbox"
      name="linkURLCB"
	    id="linkURLCB" 
      :options="{IsOpenNewTab: 'Open in new tab'}"
    />
        <div class="flex">
           <FormulateInput
            type="button"
            label="Ok"
            @click="addLink()"
            />
            
          <FormulateInput
            type="button"
            class="pdl10"
            label="Cancel"
            @click="hideLinkURL()"
            />
           
        </div>
        </div>
        
    </modal>
     <modal name="slugReadMore-modal">
        <div>
          <FormulateInput
          label="Enter the full article link url here"		  
          type="text"
		  name="slugReadMore"
		  id="slugReadMore" 
         />
		 <FormulateInput
      label=""
      type="checkbox"
      name="slugReadMoreCB"
	    id="slugReadMoreCB" 
      :options="{IsOpenNewTab: 'Open in new tab'}"
    />
        <div class="flex">
           <FormulateInput
            type="button"
            label="Ok"
            @click="addReadMoreLink()"
            />
            
          <FormulateInput
            type="button"
            class="pdl10"
            label="Cancel"
            @click="hideSlugReadMore()"
            />
           
        </div>
        </div>
        
    </modal>
  </div>
</template>

<script>
import GET_TEAM from "@/queries/getTeam.gql";
import GET_PLAYER from "@/queries/getPlayer.gql";
import GET_ARTICLES from "@/queries/getArticles.gql";
import CREATE_ARTICLE from "@/queries/createArticle.gql";
import GET_CLOUDINARY_SIGNATURE from "@/queries/getCloudinarySignature.gql";

import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  History,
  Strike,
  Underline,
  Image
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
       
  computed: {
    imageSrc: function() {
      if (this.form.image) {
        return `https://res.cloudinary.com/pley-gg/image/upload/w_200/${this.form.image.publicId}`
      }
      return null
    }, 
    playerOptions: function() {
      const players = this.$store.getters.getPlayers
      let playerOptions = []
      for (const player of players) {
        playerOptions.push({ value: parseInt(player.id), label: `[${player.id}] ${player.name}` })
      }
      console.log(playerOptions)
      return playerOptions
    }, 
    teamOptions: function() {
      const teams = this.$store.getters.getTeams;
      let teamOptions = []
      for (const team of teams) {
        teamOptions.push({ value: parseInt(team.id), label: `[${team.id}] ${team.name}` })
      }
      return teamOptions
    }
  },
  data() {
    return {
      body: null,
      editor: null,
      form: {
        title: null,
        teaser: null,
        body: null,
        image: {
          publicId: null,
          width: null,
          height: null,
          format: null,
          alt: null,
          caption: null
        },
        priority: 'DEFAULT',
        status: 'DRAFT',
        publishedAt: this.now(),
        image: null
      },
    };
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

    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new Image(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
      ],
      content: '',
      onUpdate: ({ getJSON }) => {
        // get new content on update
        const newContent = getJSON()
        this.body = JSON.stringify(newContent)
      },
    })

    await this.delay(1000)

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

    cloudinaryConfig = {
      ...cloudinaryConfig,
      button_caption: "<img src='/assets/images/icons/image.svg'/>",
      button_class: 'menubar__button',
    }
    window.mlEditor = cloudinary.createMediaLibrary(cloudinaryConfig, {insertHandler: this.insertImageInEditorHandler}, "#cloudinaryEditorML")    
  },
  methods: {
    show () {
            this.$modal.show('my-first-modal');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        },
        showSlugReadMore () {
            this.$modal.show('slugReadMore-modal');
        },
        hideSlugReadMore () {
            this.$modal.hide('slugReadMore-modal');
        },
		 showLinkURL () {
            this.$modal.show('linkURL-modal');
        },
        hideLinkURL () {
            this.$modal.hide('linkURL-modal');
        },
    insertImageHandler(data){
       console.log("1111hsgdfgasdg",data)
      const image = data.assets[0]
      console.log("hsgdfgasdg",image)
      this.form.image = {
        source: 'cloudinary',
        publicId: image.public_id,
        originalWidth: image.width,
        originalHeight: image.height,
        format: image.format,
        alt: image.context?.custom?.alt,
        caption: image.context?.custom?.caption
      }
    },
    async getTeam(id) {
      if (!id) return
      let team
      await this.$apollo.mutate({
        mutation: GET_TEAM,
        variables: {
          id: id
        },
      }).then((data) => {
        team = data.data.getTeam
      }).catch((error) => {
        console.log("error",error)
      });
      return team
    },
    async getPlayer(id) {
      if (!id) return
      let player
      await this.$apollo.mutate({
        mutation: GET_PLAYER,
        variables: {
          id: id
        },
      }).then((data) => {
        player = data.data.getPlayer
      }).catch((error) => {
        console.log("error",error)
      });
      return player
    },
    async submit() {
      const { title, teaser, priority, status, image } = this.form;
      let { playerIds, teamIds } = this.form
      let playerMentions = []
      if (playerIds) {
        for (let player of playerIds) {
          if (player.id) {
            const idPosEnd = player.id.indexOf(']')
            const playerId = parseInt(player.id.substr(1,idPosEnd-1))
            const playerName = player.id.substr(idPosEnd+2)

            const playerData = await this.getPlayer(playerId)
            const slug = playerData.slug

            let playerMention = {
              id: playerId,
              slug,
              name: playerName
            }
            playerMentions.push(playerMention)
          }
        }
      }
      if (!playerMentions) playerMentions = null

      let teamMentions = []
      if (teamIds) {
        for (let team of teamIds) {
          if (team.id) {
            const idPosEnd = team.id.indexOf(']')
            const teamId = parseInt(team.id.substr(1,idPosEnd-1))
            const teamName = team.id.substr(idPosEnd+2)

            const teamData = await this.getTeam(teamId)
            const slug = teamData.slug

            let teamMention = {
              id: teamId,
              slug,
              name: teamName
            }
            teamMentions.push(teamMention)
          }
        }
      }
      if (!teamMentions) teamMentions = null
      
      const body = this.body
      
      const publishedAt = this.dateToTimestamp(this.form.publishedAt);
      console.log(this.form.publishedAt);
      console.log(publishedAt);
      this.$apollo.mutate({
        mutation: CREATE_ARTICLE,
        variables: {
          title,
          teaser,
          body,
          priority,
          status,
          publishedAt,
          image,
          playerMentions,
          teamMentions
        },
        refetchQueries: [{ query: GET_ARTICLES }],
      }).then((data) => {
        this.$router.push({ path: "/articles/" });
        console.log(data)        
          /*
          this.$store.dispatch("addToast", {
            type: "good",
            message: "Article created!",
          });
          */
      }).catch((error) => {
        console.log(error.toString().search('Not authenticated'))
        //if (error.toString().search('Not authenticated')) this.$store.dispatch("signOut");
      });
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
};
</script>

<style>
.vm--modal{
  height: 200px !important;
    padding: 20px;
}
.flex {
    display: flex;
}
.pdl10{
  padding-left: 10px;
}
</style>
