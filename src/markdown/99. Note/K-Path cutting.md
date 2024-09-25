# K-path cutting tool

## 구상
* 사용자로부터 여러 개의 키 를 전달 받고, 2차원 K-path를 생성
* 전달 받을 키는 Gamma, K, KP, M
* 함수와 딕셔너리를 전달받고 적용하면 됨

```py
def K_path_cut(path, numpoints, **kwargs):
    """
    
    특정 포인트의 위치 정보를 받고 사용자 지정 경로를 따라 경로를 생성합니다.

    Parameters:    
    - path: 만들어야 할 길을 키워드 순서대로 (문자열로 된 배열)
        입력 예시:
            ['G', 'KP', 'M', 'K', 'G']

    - numpoints: 구간별 점 갯수 (int, 또는 int 배열(길이는 path와 같을 것))

    - kwargs: G, K, KP, M 키와 각각에 해당하는 키값으로 전달하는 함수 (key-value)
        입력 예시:
            'K' = [1, 1],
            'KP' = [1, -1],
            'G' = [0, 0],
            'M' = [2, 0]

    Returns:
    - K_Path: k 포인트들로 이루어진 (2 x N) 형태의 배열 (numpy 배열)
    """

    K_Path = []
    Pth = [kwargs[point] for point in path]
    
    if isinstance(numpoints, int):
        for idx in range(len(Pth)-2):
            K_Path.extend(list(np.linspace(Pth[idx], Pth[idx+1], numpoints, endpoint = False)))
        K_Path.extend(list(np.linspace(Pth[-2], Pth[-1], numpoints)))
    
    elif isinstance(numpoints, list):
        if len(numpoints) != len(Pth)-1:
            raise ValueError(f'구간 갯수가 맞지 않음, 실제 구간 갯수: {len(Pth)-1}, 입력된 구간 수: {len(numpoints)}')
            
        for idx, numpoint in zip(range(len(Pth)-2), numpoints[0:-1]):
            K_Path.extend(list(np.linspace(Pth[idx], Pth[idx+1], numpoint, endpoint = False)))
        K_Path.extend(list(np.linspace(Pth[-2], Pth[-1], numpoints[-1])))

    else:
        raise TypeError('numpoints는 int 또는 배열이어야 합니다.')

    K_Path = np.array(K_Path).T
    
    return K_Path

# 사용예시 

import numpy as np
import matplotlib.pyplot as plt

ps = K_path_cut(['G', 'KP', 'M', 'K', 'G', 'M', 'KP', 'K'], [3,3,3,5,15,3,4], K= [1, 1], KP = [1, -1], G = [0, 0], M = [2, 0])
plt.scatter(ps[0], ps[1])
print(ps)
```

## 결과
![K-path cutting](/Portfolio/images/99/k-p-result.png)