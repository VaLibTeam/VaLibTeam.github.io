#include <VaLib/AutoEnable.hpp>

#include <VaLib/Types.hpp>
#include <VaLib/Utils/format.hpp>

struct Town {
    VaString name;

    Town(VaString str): name(str) {};

    VaString toString() const {
        return name;
    }
};

int main() {
    // -- example data --
    VaString name = "Liam";
    int age = 21;
    Town town("New York");

    va::printlnf("Hello! my name is %s and I am %d years old. I live in %q", name, age, town);

    int n = 30;
    VaString result = va::sprintf("%d * 2: %d", n, n * 2);

    va::printlnf("%s", result);
}

/* --- output ---
Hello! my name is Liam and I am 21 years old. I live in "New York"
30 * 2: 60
*/