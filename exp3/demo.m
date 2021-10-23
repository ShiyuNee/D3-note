subplot(2 , 3 , 1)
[mappePCA3, mapping] = compute_mapping(X, 'NSY' , 3);
scatter3(mappePCA3(: , 1) , mappePCA3(: , 1) , mappePCA3(: , 3) , [] , labels , 'filled');
title("PCA 3D")

subplot(2 , 3 , 2)
[mappePCA2, mapping] = compute_mapping(X, 'NSY' , 2);
scatter(mappePCA2(: , 1) , mappePCA2(: , 1) , [] , labels , 'filled');
title("PCA 2D")

subplot(2 , 3 , 3)
[mappeIso3, mapping] = compute_mapping(X, 'Isomap' , 3);
scatter3(mappeIso3(: , 1) , mappeIso3(: , 1) , mappeIso3(: , 3) , [] , labels , 'filled');
title("Isomap 3D")

subplot(2 , 3 , 4)
[mappeIso2, mapping] = compute_mapping(X, 'Isomap' , 2);
scatter(mappeIso2(: , 1) , mappeIso2(: , 1) ,  [] , labels , 'filled');
title("Isomap 2D")

subplot(2 , 3 , 5)
[mappetSNE3, mapping] = compute_mapping(X, 'tSNE' , 3);
scatter3(mappetSNE3(: , 1) , mappetSNE3(: , 1) , mappetSNE3(: , 3) , [] , labels , 'filled');
title("tSNE 3D")

subplot(2 , 3 , 6)
[mappetSNE2, mapping] = compute_mapping(X, 'tSNE' , 2);
scatter(mappetSNE2(: , 1) , mappetSNE2(: , 1) ,  [] , labels , 'filled');
title("tSNE 2D")