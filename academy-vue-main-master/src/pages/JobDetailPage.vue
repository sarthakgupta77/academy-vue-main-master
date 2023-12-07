<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-9 col-sm-10 col-12 q-pa-sm">
        <div class="row" style="width: 100%">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12 col-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title flex align-center justify-between">
                        <q-btn color="blue-grey" icon="arrow_back_ios" size="sm" flat
                          label="Back To recommended jobs" />
                        <q-btn color="green-1" class="q-px-sm" size="sm" outline rounded text-color="green"
                          icon="edit_square" label="0/15 Jobs Applied" />
                      </div>
                    </div>
                    <div class="row q-mt-xl">
                      <div class="col-md-12 col-12">
                        <div class="heading-box q-pa-md q-mb-lg">
                          <div class="comp flex justify-between items-center">
                            <div>
                              <h3>Data Analyst</h3>
                              <span>The Times of India</span>
                            </div>
                            <div>
                              <!-- <q-checkbox
                                    v-model="like"
                                    checked-icon="thumb_up"
                                    unchecked-icon="thumb_up_off_alt"
                                    indeterminate-icon="help"
                                    label="Like"
                                    flat
                                     />
                                 <q-checkbox
                                    v-model="dislike"
                                    checked-icon="thumb_down_alt"
                                    unchecked-icon="thumb_down_off_alt"
                                    indeterminate-icon="help"
                                    label="Dislike"
                                    flat
                                    /> -->
                              <q-btn size="md" class="q-px-lg q-ml-lg" color="indigo" label="Apply" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-12 col-sm-12 col-12">
                        <div class="big-box">
                          <div class="detail-box q-pa-lg">
                            <h4>Heading Name</h4>
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book. It has survived not only five centuries, but
                              also the leap into electronic typesetting,
                              remaining essentially unchanged. It was
                              popularised in the 1960s with the release of
                              Letraset sheets containing Lorem Ipsum passages,
                              and more recently with desktop publishing software
                              like Aldus PageMaker including versions of Lorem
                              Ipsum.
                            </p>
                          </div>
                          <div class="overview-box q-pa-lg">
                            <h5>Overview</h5>
                            <ul>
                              <li>
                                <i class="fas fa-map-marker-alt q-mr-sm"></i>
                                Mumbai, India
                              </li>
                              <li>
                                <i class="fas fa-briefcase q-mr-sm"></i> 3-6
                                years
                              </li>
                              <li>
                                <i class="fas fa-money-bill"></i> &#8377; 12-18
                                LPA
                              </li>
                              <li>
                                <i class="fas fa-phone-alt"></i> Telephonic
                              </li>
                              <li><i class="fas fa-users"></i> 117 Applied</li>
                              <li><i class="fas fa-clock"></i> 4 days ago</li>
                              <li>
                                <i class="fas fa-book-open"></i> Skill Set
                              </li>
                              <li>
                                <q-chip color="grey-4" size="sm" square text-color="black" label="Sql" />
                                <q-chip color="grey-4" size="sm" square text-color="black" label="Power IB" />
                              </li>
                            </ul>
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
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
const like = ref(false);
const dislike = ref(false);
</script>

<style lang="scss" scoped>
.box {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;

  .heading-box {
    box-shadow: 0 0 6px 0.2rem rgb(178 178 178 / 16%);

    .comp {
      column-gap: 12px;

      h3 {
        margin: 0 0 4px;
        font-size: 20px;
        line-height: 24px;
        font-weight: 600;
        color: $primary;
      }

      span {
        font-size: 13px;
      }
    }
  }

  .big-box {
    display: flex;
    column-gap: 25px;

    .detail-box {
      box-shadow: 0 0 6px 0.2rem rgb(178 178 178 / 16%);
      width: 100%;

      h4 {
        margin: 0 0 30px;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 22px;
      }
    }

    .overview-box {
      box-shadow: 0 0 6px 0.2rem rgb(178 178 178 / 16%);
      width: 55%;

      h5 {
        margin: 0 0 15px;
        font-weight: 600;
        font-size: 18px;
      }

      ul {
        padding-left: 0;
        margin: 0 0 10px;

        li {
          font-size: 13px;
          color: #3f3f3f;
          margin-bottom: 5px;

          i {
            margin-right: 5px;
            color: #3f51b5;
          }
        }
      }
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

@media (min-width: 768px) and (max-width: 1024px) {
  .box {
    .big-box {
      .detail-box {
        h4 {
          margin: 0 0 20px;
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .row {
    display: block;
  }

  .widget {
    padding: 10px;

    .widget-title {
      row-gap: 15px;
    }

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

    .heading-box {
      .comp {
        column-gap: 12px;

        h3 {
          font-size: 15px;
          line-height: 14px;
        }

        span {
          font-size: 11px;
        }
      }
    }

    .big-box {
      display: block;

      .detail-box {
        width: 100%;
        margin-bottom: 24px;

        h4 {
          margin: 0 0 15px;
          font-size: 18px;
        }
      }

      .overview-box {
        width: 100%;
      }
    }
  }
}
</style>
