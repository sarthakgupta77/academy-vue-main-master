<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%;">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-9 col-sm-10 col-12 q-pa-sm">
        <div class="row" style="width: 100%;">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="row">
                <div class="col-md-12 col-12">
                  <div class="q-pa-md">
                    <div class="widget">
                      <div class="widget-title flex align-center justify-between">
                        <h6>Book a Personalised Session</h6>
                      </div>
                    </div>
                    <div class="row justify-center">
                      <div class="col-lg-4 col-md-4 col-sm-6 col-12 q-pa-sm">
                        <div class="book-box">
                          <!-- <i class="fas fa-users-cog" style="color:#29b6f6"></i> -->
                          <img src="https://datatrained.com/images/book-1.jpg" style="width:100%;" />
                          <h5>Book a <br/>Career Coach Session</h5>
                          <p>You can talk to your career coach in a group session wherein the Career Coach will help you walk through our Platform. You can ask all your queries and questions related to the program you’re enrolled in via this session.</p>
                          <p>Call or Chat with a Career Coach to fix a Mentor Sessions appointments for you. </p>
                          <div class="flex justify-center q-mt-md">
                            <q-btn color="indigo-5" label="Call" href="tel:+919560084091" class="q-mr-md" />
                            <q-btn outline color="indigo-5" label="Chat" href="#" />
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4 col-sm-6 col-12 q-pa-sm">
                        <div class="book-box">
                          <img src="https://datatrained.com/images/book-2.jpg" style="width:100%;" />
                          <h5>Book a <br/>Mentor Session</h5>
                          <p>A mentor is usually a trainer or an Industry professional working in the same domain wherein you’re aspiring to build your career. Two Mentor Sessions are allowed in a month. Additional Mentor Sessions will incur a cost.</p>
                          <p>Call or Chat with a Career Coach to fix a Mentor Sessions appointments for you. </p>
                          <div class="flex justify-center q-mt-md">
                            <q-btn color="indigo-5" label="Call" href="tel:+919560084091" class="q-mr-md" />
                            <q-btn outline color="indigo-5" label="Chat"  href="#" />
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-md-4 col-sm-6 col-12 q-pa-sm">
                        <div class="book-box">
                          <img src="https://datatrained.com/images/book-3.webp" style="width:100%;" />
                          <h5>Book a <br/>Doubt Clearing Session</h5>
                          <p>Your Trainer conducts weekly Doubt Clearing sessions. Use this option to enroll yourself for this week’s Doubt Clearing Session. Please note that you can switch on your Mike during the Doubt Clearing Sessions.</p>
                          <p>Call or Chat with a Career Coach to fix a Mentor Sessions appointments for you.</p>

                          <div class="flex justify-center q-mt-md">
                            <q-btn color="indigo-5" label="Call" href="tel:+919560084091" class="q-mr-md" />
                            <q-btn outline color="indigo-5" label="Chat"  href="#" /> 
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
import { ref } from 'vue'
</script>

<style lang="scss" scoped>
.box {
	background-color: #ffffff;
	border-radius: 8px;
	overflow: hidden;

	.book-box {
		padding: 20px 15px;
		box-shadow: 0 0 6px 0.2rem rgb(178 178 178 / 16%);
		border-radius: 10px;
		height: 100%;
		text-align: center;

		h5 {
			margin: 0 0 15px;
			font-size: 17px;
			font-weight: 500;
			line-height: 22px;
			color: #1a237e;
		}

		p {
			font-size: 13px;
			margin-bottom: 4px;
		}

		& p:last-child {
			margin-bottom: 0;
		}

		i {
			font-size: 65px;
			margin-bottom: 10px;
		}
	}
}

.widget {
	padding: 20px;

	.widget-title {
		margin-bottom: 30px;

		h6 {
			font-weight: 700;
			font-size: 24px;
			color: #3f3f3f;
			letter-spacing: 0px;
			margin: 0;
		}
	}

}
@media (min-width:1024px) and (max-width:1044px){
.box {
		.book-box {
			h5 {
				font-size: 16px;
			}
		}
	}
}
@media (min-width:768px) and (max-width:1023px) {
	.box {
		.book-box {
			p {
				font-size: 12px;
			}
		}
	}
}

@media (max-width:767px) {
	.row {
		display: block;
	}

	.box {
		margin-bottom: 60px;
	}

	.widget {
		padding: 10px;

		.widget-title {
			margin-bottom: 10px;

			h6 {
				font-size: 18px;
				line-height: 1.3;
			}
		}
	}
}
</style>
