clc  
clear  
close all  
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
% Isomap降维  
subplot(1 , 2 , 1)
[mappedX , mapping] = compute_mapping(attr , 'tSNE' , 2);
scatter(mappedX(:,1), mappedX(:,2) ,[] ,  color)  
title('Result of t-SNE 2D')  

subplot(1 , 2 , 2)
[mappedX , mapping] = compute_mapping(attr , 'tSNE' , 3);
scatter3(mappedX(:,1), mappedX(:,2) , mappedX(: , 3) , [] ,  color)  
title('Result of t-SNE 3D')  
