<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <svg
        t="1640348950646"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1803"
        width="16"
        height="16"
      >
        <path
          d="M513.8 97.1C284.5 97.1 98 283.6 98 512.9s186.5 415.8 415.8 415.8 415.8-186.5 415.8-415.8S743 97.1 513.8 97.1z m0 792.9c-207.9 0-377.1-169.2-377.1-377.1 0-207.9 169.2-377.1 377.1-377.1 207.9 0 377.1 169.2 377.1 377.1 0 207.9-169.2 377.1-377.1 377.1z m70.5-245.3c-20.5-5.1-38.7 68.3-70.3 57.7-3-1.1-2.7-0.7-5-2.5 9.7-104.9 52.5-198.4 72.8-301.1h-5c-42 14.8-104.8 8.9-145.6 25.1v12.5c60.7-1.2 44.9 35.8 32.6 80.3-15.2 55-42.9 123.8-47.7 173.2-4.8 49.3 25.7 67.9 55.2 67.7 41.7-0.2 76.9-41.1 95.4-65.2 4.7-6.2 38.1-42.6 17.6-47.7z m-23.7-401.3c-28.4 0-51.3 23-51.3 51.4s23 51.3 51.3 51.3c28.3 0 51.3-23 51.3-51.3 0-28.4-23-51.4-51.3-51.4z"
          p-id="1804"
          fill="#8a8a8a"
        ></path>
      </svg>
    </div>
    <div class="card-content">
      <span>{{number}}</span>
    </div>
    <div class="card-charts">
      <slot name="charts"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title",'number'],
};
</script>
<style lang="scss" scope>
.card-header {
  display: flex;
  justify-content: space-between;
  color: #c8c9c7;
}
.card-content {
  font-size: 30px;
  margin-top: 10px;
}
.card-charts {
  height: 60px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 8px;
}
.card-footer {
  padding: 8px 0;
  border-top: 1px solid #f5f5f5;
}
</style>