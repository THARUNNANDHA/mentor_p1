arr=[15,3,5,6,10,15]
arr.sort()
print(arr)
amount=10
count=0
for i in arr:
    if i%5==0:
        count+=1
    elif amount-i>=0:
        amount-=i
        count+=1

print(count)