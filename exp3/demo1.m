%%
data = importdata("bbb.txt");
%%
sex = data.textdata;
attr = data.data;
%%
i = 1;
while i <= length(sex)
    if sex{i} == "M"
        sex{i} = 0;
    elseif sex{i} == "F"
        sex{i} = 1;
    else
        sex{i} = 2;
    end
    i = i + 1;
end
%%
sex = cell2mat(sex);
%%
attr = [sex , attr];
%%
attr = attr(: , 1 : 8);
%%
coeff = pca(attr , 'NumComponents',3 )
%%
color = ones(4177 , 3);
i = 1;
while i < length(data.data(: , 8))
    if data.data(i , 8) < 10
        color(i,:) = [1 , 0 , 0]; 
    elseif data.data(i , 8) < 20
        color(i,:) = [0 , 1 , 0]; 
    else
        color(i,:) = [0 , 0 , 1]; 
    end
   
   i = i + 1;
end
pca3Attr = attr * coeff;
subplot(1 , 2 , 1)
scatter3(pca3Attr(:,1) , pca3Attr(:,2) , pca3Attr(:,3) ,[] , color , 'filled')
%%
coeff2 = pca(attr , 'NumComponents',2 )
pca2Attr = attr * coeff2;

scatter(pca2Attr(:,1) , pca2Attr(:,2) , [] , color)



