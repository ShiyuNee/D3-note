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
% Isomap降维  
subplot(1 , 2 , 1)
[mappedX, mapping] = compute_mapping(attr, 'Isomap' , 3);
scatter3(mappedX(:,1), mappedX(:,2) , mappedX(: , 3))  
title('Result of Isomap 3D')
%%
subplot(1 , 2 , 2)
[mappedX, mapping] = compute_mapping(attr, 'Isomap' , 2);
scatter(mappedX(:,1), mappedX(:,2))  
title('Result of Isomap 2D')  
drawnow  