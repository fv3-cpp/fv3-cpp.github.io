# ポインターとは

ポインターはメモリ上のアドレスを保持する変数です。

```cpp
int value = 10;
int* ptr = &value;
docs/md/pointer/intro.md
```
# shared_ptr
```cpp
std::shared_ptr<int> p =
    std::make_shared<int>(10);
```
