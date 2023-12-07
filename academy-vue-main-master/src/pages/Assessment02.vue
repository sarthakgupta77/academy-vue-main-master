<template>
  <div class="header">
    <h1>Testing</h1>
    <div class="time">Total Duration: <span>00:00:00</span></div>
    <!-- <q-btn icon="close" flat round dense color="white"/> -->
  </div>
  <div class="big-box">
    <div class="question-box">
      <div class="question-area-box">
        <table class="result-table table-responsive table-responsive-sm table-responsive-md">
          <thead>
            <tr>
              <th>Section Name</th>
              <th>No. of Questions</th>
              <th>Answered</th>
              <th>Not Answered</th>
              <th>Marked for Review</th>
              <th>Not Visited</th>
              <th>Time Taken</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Part A</td>
              <td>2</td>
              <td>0</td>
              <td>2</td>
              <td>0</td>
              <td>0</td>
              <td>00:00:29</td>
            </tr>
          </tbody>
        </table>
        <div class="submit-btn">
          <span>Are you sure you want to submit ?</span>
          <q-btn label="Submit" type="submit" color="indigo" class="q-mr-md" />
          <q-btn label="No, Go Back To Quiz" type="submit" color="grey" />
        </div>
      </div>
    </div>
    <div class="user-detail">
      <div class="stats-box">
        <ul>
          <li><span class="ansr">7</span>Answered</li>
          <li><span class="not-ansr">3</span>Not Answered</li>
          <li><span class="remain">9</span>Remaining Questions</li>
          <li><span class="mark">0</span>Mark for Review</li>
          <li><span class="mark-ansr">0</span>Mark for Review & Answered</li>
        </ul>
      </div>
      <div class="question-list-box">
        <ul>
          <li><a href="#" class="ansr">1</a></li>
          <li><a href="#" class="ansr">2</a></li>
          <li><a href="#" class="not-ansr">4</a></li>
          <li><a href="#" class="not-ansr">5</a></li>
          <li><a href="#" class="not-ansr">6</a></li>
          <li><a href="#" class="ansr">7</a></li>
          <li><a href="#" class="not-ansr">8</a></li>
          <li><a href="#" class="ansr">9</a></li>
          <li><a href="#" class="ansr">10</a></li>
          <li><a href="#" class="ansr">11</a></li>
          <li><a href="#" class="remain">12</a></li>
          <li><a href="#" class="remain">13</a></li>
          <li><a href="#" class="remain">14</a></li>
          <li><a href="#" class="remain">15</a></li>
          <li><a href="#" class="remain">16</a></li>
          <li><a href="#" class="remain">17</a></li>
          <li><a href="#" class="remain">18</a></li>
          <li><a href="#" class="remain">19</a></li>
          <li><a href="#" class="remain">20</a></li>
        </ul>
      </div>
      <div class="submit-box">
        <q-btn label="Submit" type="submit" color="green" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const customModel = ref('no')
const shape = ref('line')
const option1 = ref(false)
const option2 = ref(false)
const option3 = ref(false)
const option4 = ref(false)

</script>
<style lang="scss" scoped>
.header {
  background-color: #0f0c3b;
  width: 100%;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 999;
  height: 8%;

  h1 {
    margin: 0;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1px;
    color: #fff;
    line-height: 20px;
  }

  .time {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
}

.big-box {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 8%;
  left: 0;
  bottom: 0;
  overflow-x: hidden;

  .question-box {
    position: fixed;
    left: 0;
    height: 100%;
    width: 70%;
  }

  .user-detail {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    height: 95%;
    position: fixed;
    right: 0;
    width: 30%;

    .stats-box {
      padding: 15px 22px;
      height: 40%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      overflow-y: auto;
      border-bottom: 1px solid #dddddd;

      ul {
        padding-left: 0;
        margin: 0;

        li {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          column-gap: 25px;
          font-size: 12px;

          span {
            height: 32px;
            width: 32px;
            line-height: 32px;
            border-radius: 100%;
            text-align: center;
            color: #fff;
            font-size: 12px;
          }

        }
      }
    }

    .question-list-box {
      padding: 22px;
      height: 45%;
      overflow-y: auto;
      border-bottom: 1px solid #dddddd;

      ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        column-gap: 15px;
        row-gap: 15px;
        padding-left: 0;

        li {
          list-style: none;

          a {
            height: 40px;
            width: 40px;
            line-height: 40px;
            border-radius: 100%;
            text-align: center;
            color: #fff;
            display: block;
            text-decoration: none;

            &:hover {
              box-shadow: 0px 0px 6px rgb(48 157 180 / 59%);
            }
          }
        }
      }

    }

    .ansr {
      background-color: #75c204;
    }

    .not-ansr {
      background-color: #b70000;
    }

    .remain {
      background-color: #ddd;
      color: #353535 !important;
    }

    .mark {
      background-color: #6bceed;
    }

    .mark-ansr {
      background-color: #f87a82;
    }
  }

  .submit-box {
    height: 12%;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }

  .question-area-box {
    height: 60%;
    overflow-y: auto;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .result-table {
      border: 1px solid #ccc;
      border-collapse: collapse;
      border-spacing: 0;
      width: 80%;
      margin: 0 auto 35px;

      tr {
        text-align: center;

        th {
          border: 1px solid #ccc;
          padding: 10px;
        }

        td {
          border: 1px solid #ccc;
          padding: 10px;

        }
      }
    }

    .submit-btn {
      text-align: center;

      span {
        display: block;
        margin-bottom: 12px;
      }
    }
  }



  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(90, 94, 185, 0.5);
    border-radius: 10px;
  }
}</style>
