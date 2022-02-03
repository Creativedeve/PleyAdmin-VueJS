<template>
  <transition :name="direction">
    <div
      class="sidepanel"
      v-if="panel"
      :style="calculateOffset"
      :left="true"
      :key="id"
      :class="{
        processing: processing,
        noscroll: noscroll,
        wide: wide,
        xwide: xwide,
      }"
    >
      <div
        class="sidepanel-wrapper"
        :style="{ 'background-color': backgroundColor }"
      >
        <transition name="processing">
          <div class="processing-info" v-if="processing">
            <loading-spinner />
          </div>
        </transition>
        <div class="sidepanel-header" :style="headerStyle">
          <slot name="extras"></slot>
          <span>{{ title }}</span>
          <button @click="done(id, false)">
            <!--<svgicon name="close"></svgicon>-->x
          </button>
          <button
            class=""
            @click="$emit('save')"
            v-if="saveIcon"
            id="sidepanel-save-icon"
          >
            <!--<svgicon name="check" width="30" height="30" />-->Save
          </button>
        </div>
        <div class="sidepanel-contents" :class="{ nopad: nopadding }">
          <slot :payload="panel.payload"></slot>
        </div>
        <div class="sidepanel-actions" v-if="doneButton">
          <button @click="done(id, true)">Done</button>
        </div>
        <slot name="absoluteItems"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
//import "@/icons/check";
//import "@/icons/close";

export default {
  name: "sidepanel",
  props: {
    title: {
      type: String,
    },
    id: {
      type: String,
    },
    left: {
      type: Boolean,
    },
    doneButton: {
      type: Boolean,
    },
    saveIcon: {
      type: Boolean,
      default: false,
      required: false,
    },
    colorFG: {
      type: String,
    },
    colorBG: {
      type: String,
    },
    processing: {
      type: Boolean,
    },
    nopadding: {
      type: Boolean,
      required: false,
      default: false,
    },
    wide: {
      type: Boolean,
      required: false,
      default: false,
    },
    xwide: {
      type: Boolean,
      required: false,
      default: false,
    },
    noscroll: {
      type: Boolean,
      required: false,
      default: false,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "#ffffff",
    },
  },
  computed: {
    direction: function() {
      if (!this.left) return "sidepanel";
      return "sidepanel-left";
    },
    calculateOffset: function() {
      if (!this.left) return { right: 5 * this.panelDepth + "px" };
      return { left: "0" };
    },
    panelDepth: function() {
      return this.$store.getters["panelDepth"](this.id);
    },
    panel: function() {
      return this.$store.getters["sidepanel"](this.id);
    },
    headerStyle() {
      let styleObj = {};
      if (this.colorBG) styleObj["background-color"] = this.colorBG;
      if (this.colorFG) styleObj["color"] = this.colorFG;
      return styleObj;
    },
  },
  methods: {
    done(id, doneButton) {
      this.$emit("done", doneButton);
      this.removePanel();
    },
  },
  watch: {
    panel: {
      handler(to, from) {
        const fromId = from ? from.id : "";
        if (to !== null && to.id !== fromId) this.$emit("open");
        if (to === null && from !== null) this.$emit("close");
      },
    },
  },
};
</script>

<style lang="less">
@import "../styles/vars.less";

@colBlue: #1155dd;
@colBrand: #888;

.sidepanel {
  position: fixed;
  width: 100%;
  background-color: #fff;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: right 0.2s ease-out;
  .processing-info {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .sidepanel-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  .sidepanel-header {
    flex: 0 @h6;
    display: flex;
    align-items: center;
    background-color: #333;
    color: #fff;
    z-index: 0;
    > span {
      flex: 1;
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      padding-left: @h2;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > button {
      flex: 0 @h6;
      height: @h6;
      background-color: transparent;
      font: inherit;
      color: inherit;
      font-size: 12px;
      border: none;
      appearance: none;
      border-radius: 0;
      &#sidepanel-save-icon {
        background-color: rgba(0, 0, 0, 0.1);
        svg {
          width: @h4;
          height: @h4;
        }
      }
    }
    svg {
      width: @h3;
      height: @h3;
      fill: currentColor;
    }
  }

  .panel-object {
    padding: @h1;
    background-color: darken(@colGreyLight, 5%);
    margin: @h1 -@h1 @h1 -@h1;
    &:first-child {
      margin-top: -@h1;
    }
    & > div {
      &:not(.no-object-padding) {
        padding: @h1 * 1.5;
      }
      border-radius: @hh;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      // background-color: @colGreyLight;
      color: @colBlack; // fade(@colBlack, 50%);
    }
    &.white {
      background-color: #fff;
      & > div {
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      }
    }
  }

  &:not(.noscroll) {
    .sidepanel-contents {
      .scrollable();
    }
  }
  &.noscroll {
    .sidepanel-contents {
      overflow: hidden;
      position: relative;
    }
  }

  .fill-panel {
    width: 100%;
    height: 100%;
  }

  .sidepanel-contents {
    flex: 1;
    &:not(.nopad) {
      padding: @h1;
    }
    .no-padding {
      margin: -@h1;
    }

    .panel-note {
      margin: -@h1;
      margin-bottom: @h1;
      padding: @h2;
      background-color: #ffffcc;
    }
    .panel-explanation {
      margin: -@h1;
      margin-bottom: @h1;
      padding: @h1 @h2;
      background-color: fade(@colBlue, 10%);
      color: @colBlue;
      font-size: 0.8rem;
      border-top: 1px solid fade(@colBlue, 10%);
    }
    .panel-actions {
      margin: @h1 0;
      &.fix-to-bottom {
      }
      button {
        width: 100%;
        //background-color: #000000;
        //color: #ffffff;
        height: @h4;
        text-align: center;
        text-transform: uppercase;
        font-size: 13px;
        justify-content: center;
        font-weight: bold;
        border-radius: @hh;
        &:active {
          transform: translateY(1px);
          opacity: 0.7;
        }

        &.good {
          background-color: @colBrand;
          color: #fff;
          &.outline {
            background-color: #fff;
            border: 1px solid @colBrand;
            color: @colBrand;
          }
        }

        &.primary-button {
          background-color: @colBlack;
          color: #fff;
        }
        &.secondary-button {
          background-color: #fff;
          border: 1px solid @colBlack;
          color: @colBlack;
        }
        &.danger-button {
          background-color: #fff;
          border: 1px solid @colBad;
          color: @colBad;
        }
        &:disabled {
          background-color: #ddd;
          color: #aaa;
        }
        & + button {
          margin-top: @hh;
        }
      }
    }
    .panel-actions {
      h2 {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.03em;
        margin: @h1 0;
        padding: 0;
      }
    }
    .panel-options {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      margin-bottom: @h2;
      h2 {
        font-weight: normal;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.03em;
        margin: @h1 0;
        padding: 0;
      }
      button {
        &.panel-option-icon-and-column {
          display: flex;
          flex-direction: row;
          height: auto;
          padding: @h1 @hh;
          svg {
            flex: 0 @h4;
          }
          & > span {
            margin-left: @hh;
            display: flex;
            flex-direction: column;
            & > span {
              &:first-child {
                font-weight: bold;
              }
            }
          }
        }
        border-radius: 0;
        &:first-of-type {
          border-radius: @hh @hh 0 0;
        }
        &:last-of-type {
          border-radius: 0 0 @hh @hh;
          &:first-of-type {
            border-radius: @hh;
          }
        }
        appearance: none;
        font: inherit;
        display: block;
        height: @h4;
        margin-bottom: 1px;
        text-align: left;
        padding: 0 @h1;
        background-color: @colGreyLight; // rgba(32, 160, 230, 0.3);
        border: none;
        position: relative;
        &.checkable {
          padding-left: @h4;
          &:before {
            content: "";
            width: @h1 - 2;
            height: @h1 - 2;
            position: absolute;
            left: @h1 * 1.5;
            top: @h1 * 1.5;
            border: 1px solid #888;
          }
        }

        &.active {
          color: darken(@colBrand, 20%);
          background-color: lighten(@colBrand, 30%);
          font-weight: bold;
          // background-color: @colBlack;
          // color: #fff;
          &:before {
            content: "";
            border-color: darken(@colBrand, 20%);
            background-color: darken(@colBrand, 20%);
          }
        }
        &.icon-button {
          padding-left: @h4;
          svg {
            position: absolute;
            top: @h2;
            left: @h2;
            transform: translate(-50%, -50%);
          }
        }
        &:not(.active):hover {
          background-color: darken(@colGreyLight, 5%);
        }
        &.two-levels {
          min-height: @h5;
          height: auto;
          & > div {
            &:first-child {
            }
            &:last-child {
              font-size: 0.8rem;
            }
          }
        }
        &.three-levels {
          padding: @hh @h1;
          min-height: @h5;
          height: auto;
          & > div {
            &:first-child {
            }
            &:nth-child(2) {
              font-size: 0.8rem;
            }
            &:last-child {
              font-size: 0.8rem;
              opacity: 0.5;
            }
          }
        }
        &.split-button {
          display: flex;
          padding: 0;
          justify-content: space-between;
          align-content: stretch;
          & > div {
            &:first-child {
              padding: @h1;
              // outline: 1px solid #f00;
              display: flex;
              flex: 0 1 100%;
            }
            &:last-child {
              width: @h4;
              display: flex;
              justify-content: center;
              align-items: center;
              height: @h4;
              color: #800;
              &:hover {
                color: #f00;
              }
            }
          }
        }
      }
      & + .panel-options {
        margin-top: @h2;
      }
    }
  }

  .sidepanel-actions {
    padding: @h1;
    button {
      appearance: none;
      width: 100%;
      height: @h4;
      font: inherit;
      //      background-color: @colBlack;
      border-radius: @hh;
      border: none;
      //      color: #fff;
      &.green {
        background-color: @colBrand;
        &.outline {
          color: @colBrand;
          background-color: transparent;
          border: 1px solid @colBrand;
        }
      }
      &.red {
        background-color: @colBad;
        &.outline {
          color: @colBad;
          background-color: transparent;
          border: 1px solid @colBad;
        }
      }
    }
  }
}

@media @medium {
  .sidepanel {
    width: @panelWidth;
    max-width: 100%;
    &.wide {
      width: @panelWideWidth;
    }
    &.xwide {
      width: @panelXWideWidth;
    }
  }
}

.sidepanel-enter-active,
.sidepanel-leave-active {
  transition: all 0.2s ease-out;
}
.sidepanel-enter,
.sidepanel-leave-to {
  opacity: 0.5;
  transform: translateX(100%);
}
.sidepanel-left-enter-active,
.sidepanel-left-leave-active {
  transition: all 0.2s ease-out;
}
.sidepanel-left-enter,
.sidepanel-left-leave-to {
  opacity: 0.5;
  transform: translateX(-100%);
}

.processing-enter-active,
.processing-leave-active {
  transition: all 0.2s ease-out;
}
.processing-enter,
.processing-leave-to {
  opacity: 0;
}
</style>
