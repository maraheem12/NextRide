class Solution {
    public int totalMoney(int n) {
        int total = 0;
        int week = 0;
        int lastMonday = 1;
        int count = 1;
        for(int i=0; i<n; i++){
            total += count;
            count++;
            week++;
            if(week == 7){
                count = lastMonday+1;
                lastMonday = lastMonday+1;
                week = 0;
            }
        }
        return total;
    }
}
