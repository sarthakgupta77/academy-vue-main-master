<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div
        class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-9 col-sm-10 col-12 q-pa-sm"
      >
        <div class="row" style="width: 100%">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12 col-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <h6>Jobs</h6>
                      <div
                        class="widget-title flex align-center justify-between"
                      >
                        <JobNavbar />
                      </div>
                    </div>
                    <div class="row q-mt-xl">
                      <div class="col-md-4 col-sm-12">
                        <FiltersBox />
                      </div>
                      <div class="offset-md-1 col-md-7 col-sm-12">
                        <div class="showing-no">
                          <span>Showing 1 - 20 of 20 Jobs</span>
                          <JobBox />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import JobNavbar from "components/JobNavbar.vue";
import FiltersBox from "components/FiltersBox.vue";
import JobBox from "components/JobBox.vue"; 
</script>

<style lang="scss" scoped>
.box {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;

  .title {
    background-color: #00ccf2;
    padding: 10px;
  }

  h6 {
    margin: 0px;
  }
  .showing-no {
    span {
      color: #757575;
    }
  }
}

.widget {
  padding: 20px;
  h6 {
    font-weight: 700;
    font-size: 24px;
    color: #3f3f3f;
    letter-spacing: 0px;
    margin-bottom: 30px;
  }

  .widget-container {
    padding: 20px;
    margin-top: 20px;
    border-radius: 8px;
    width: 100%;
    white-space: nowrap;
    position: relative;
  }
}
@media (min-width: 768px) and (max-width: 992px){
  .widget {
    padding: 8px;
  }
}

@media (max-width: 767px) {
  .row {
    display: block;
  }

  .widget {
    padding: 0;

    .widget-title {
      h6 {
        font-size: 18px;
        line-height: 1.3;
      }
    }

    .widget-container {
      h4 {
        font-size: 18px;
        margin-bottom: 0;
      }

      div {
        p {
          display: flex;

          .q-chip {
            height: 2.5em;
          }
        }
      }
    }
  }
  .box {
    margin-bottom: 60px;
    .showing-no {
      span {
        display: block;
        margin-top: 30px;
      }
    }
  }
}
</style>
