<template>
  <q-page class="q-py-md">
    <div class="row" style="width: 100%">
      <div class="offset-lg-2 offset-md-2 offset-sm-2 col-lg-8 col-md-9 col-sm-10 col-12 q-pa-sm">
        <div class="row" style="width: 100%">
          <div class="col-md-12 col-12">
            <div class="box q-pa-lg">
              <div class="row">
                <div class="col-md-12 col-12">
                  <div class="img-box text-center">
                    <img src="https://www.datatrained.com/images/error404.png" alt="">
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


<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
<style lang="scss" scoped>
.box {
  border-radius: 8px;
  overflow: hidden;
}

.img-box {
  img {
    max-width: 55%;
  }
}

@media (max-width:1024px) {
  .img-box {
    img {
      max-width: 100%;
    }
  }
}
</style>