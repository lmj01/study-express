
# Markdown语法测试

> 引用的内容
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

# 列表 无序
- 1
    * 1.1
- 2
    * 2.1
    * 2.2
- 3

# 列表 有序的
1. 1
2. 2
3. 3

# 粗体与斜体
**这是粗体** *这是斜体*

# 分割线
***

# 表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

# 代码
`int a = 3 + 5;`
```
int main(int argc, char **argv) {
    printf("hello,world!");
    return 0;
}
```

# 数学公式Latex语法
[latex-math-symbol](./document/latex-maths-symbols.pdf)
## 测试
$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
$$
## ss
$$
\begin{align}
v + w & = 0 && \text{Given} \tag{1} \\
-w & = -w + 0 && \text{additive identity} \tag{2} \\
-w + 0 & = -w + (v + w) && \text{equations $(1)$ $(2)$}
\end{align}
$$
# sss
$$
\bbox[yellow, 5px,border:2px solid red]
{
 e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n \qquad(2.1)   
}
$$
##   测试
$$
\bbox[5px,border:2px solid red]
{
    e^x=\lim_{n\to\infty} \left( 1+\frac{x}{n} \right)^n \qquad(2)
}
$$
$$
\sum_{n=1}^\infty \frac{1}{n^2} \to \textstyle \sum_{n=1}^\infty \frac{1}{n^2} \to \displaystyle \sum_{n=1}^\infty \frac{1}{n^2}
$$
## long division
$$
\begin{array}{r}
13 \\ 
4 \enclose{longdiv}{52} \\
\underline{4}\phantom{2} \\
12 \\
\underline{12}
\end{array}
$$
## test
$$
\begin{CD}
RCOHR'SO_3Na @>{\text{Hydrolysis,$\Delta,Dil.HCL$}}>> (RCOR')+NaCl+SO_2+H_2O
\end{CD}
$$
## test
$$
x^3-6x^2+11x-6=(x-1)(x^2-5x+6)+0
$$
$$
\begin{array}{c|rrrr}
& x^3 & x^2 & x^1 & x^0 \\
& 1 & -6 & 11 & -6\\
{\color{red}1} & \downarrow & 1 & -5 & 6 \\
\hline & 1 & -5 & 6 & |\phantom{-}{\color{blue}0}
\end{array}
$$
## simply equation
$$
e=mc^2 \tag{111}\label{eq1.111}
$$
## multi-line equation
$$
\begin{equation}
\begin{aligned}
a &= b + c \\
  &= d + e + f + g  \\
  &= h + i
\end{aligned}
\end{equation} \tag{211}\label{eq2.1221}
$$
##  multiple aligned equations
$$
\begin{align}
a &= b + c \tag{311}\label{eq3.111} \\
x &= yz \tag{411}\label{eq4.111} \\
l &= m - n \tag{511}\label{eq5.111}
\end{align}
$$
## 单位 units
$$
\left.\mathrm{kg}\!\cdot\!\mathrm{m}^2\middle/\left(\mathrm{C}\!\cdot\!\mathrm{s}\right)\right. \\
\mathrm{m}^2 \\
\left.\mathrm{m}\middle/\mathrm{s}^2\right. \\
\mathrm{m}\,\mathrm{s}^{-2} \\
\mathrm{s}^{-1}\,\mathrm{mol} \\
\mu_0=4\pi \times 10^{-7} 
\left. \mathrm{\mathrm{T}\!\cdot \mathrm{m}}\middle/\mathrm{A} \right. 
\\
180^\circ=\pi \ \mathrm{rad} 
\\
N_A = 6.022 \times 10^{23} \ mathrm{mol}^{-1}
$$
## test AMScd
$$
\begin{CD}
A @>>> B @>{\text{very long label}}>>c \\
@. @AAA @| \\
D @= E @<<< F
\end{CD}
$$
$$
\begin{CD}
A @>a>>B\\
@V b V V= @VV c V \\
C @>>d> D
\end{CD}
$$
## cases piecewise functions
$$
fn = 
\begin{cases}
n/2, & \text{if $n$ is even} \\
3n+1, & \text{if $n$ is odd}
\end{cases}
$$
$$
\left.
\begin{array}{1}
\text{if $n$ is even:}&n/2 \\
\text{if $n$ is odd:}&3n+1
\end{array}
\right\} = f(n)
$$
