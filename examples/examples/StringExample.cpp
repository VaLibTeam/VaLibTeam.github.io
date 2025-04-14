#include <VaLib/Types/String.hpp>
#include <VaLib/Utils.hpp>

int main() {
    VaString s1 = "Hello, ";
    VaString s2 = "world!";
    VaString s3 = s1 + s2;

    va::printlnf("s1: %q, s2: %q\ns3: %q", s1, s2, s3);

}

/* --- output ---
s1: "Hello, ", s2: "world!"
s3: "Hello, world!"
*/