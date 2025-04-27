#include <VaLib/Types/List.hpp>
#include <VaLib/Utils/format.hpp>

int main() {
  VaList<int> list = {
      1, 2, 3}; // Creates a new list of integers, with values: 1, 2, 3
  list.append(
      123); // Adds element 123 to the end of the list, using the append method.
  list.extend(
      {5, 4, 3}); // Expands the `list` with the list {5, 4, 3}. This list will
                  // now have the values: {1, 2, 3, 123, 5, 4, 3}.

  va::printlnf("list length: %d",
               len(list)); // output: 7 (because the list has 7 elements)

  list[1] = 200; // change of the second element to 200

  for (int i = 0; i < len(list); i++) { // iteration through the list
    va::printlnf("list[%d]: %d", i, list.at(i));
  }
}

/* --- output ---
list length: 7
list[0]: 1
list[1]: 200
list[2]: 3
list[3]: 123
list[4]: 5
list[5]: 4
list[6]: 3
*/