import { defineCliConfig } from 'sanity/cli'

// CLI 不會像瀏覽器那樣自動帶入環境變數，為了避免 projectId 為空，這裡直接寫死專案資訊
// 如果之後有換 Sanity 專案，只要改這兩個值即可。
export default defineCliConfig({
  api: {
    projectId: 'fhqlqt4e',    // 你的 Sanity projectId
    dataset: 'production',    // 目前使用的 dataset
  },
})


