#include <stdio.h>

int a[2000][2000];

int main(){
    
    int num;    
    scanf("%d",&num);
    
    int temp=2*num-1, n= 2*num-1;

    int k=0;
    while(num!=0){
        for(int i=k;i<n;i++){
            for(int j=k;j<k+1;j++){
                if(i==j){
                    a[i][j]=num;
                }
                else{
                    a[i][j]=num;
                    a[j][i]=num;
                    a[n-1][i]=num;
                    a[i][n-1]=num;
                }
            }
            
        }
            num--;
            k++;
            n--;
        
    }
    
    for(int i=0;i<temp;i++){
        for(int j=0;j<temp;j++){
            printf("%d ",a[i][j]);
        }
        printf("\n");
    }
    return 0;
}
