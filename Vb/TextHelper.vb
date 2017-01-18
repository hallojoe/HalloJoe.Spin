Namespace HalloJoe.Spin.Vb

    ''' <summary>
    ''' Simple helper that allow counting words within a string
    ''' </summary>
    ''' <remarks>Fits most</remarks>
    Public NotInheritable Class TextHelper

        ''' <summary>
        ''' Word seperators
        ''' </summary>
        ''' <remarks></remarks>
        Private Shared _seperators As Char() = New Char() {" "c, ","c, ";"c, "."c, "!"c, """"c, "("c, ")"c, "?"c}

        ''' <summary>
        ''' Counts number of words within a string
        ''' </summary>
        ''' <param name="s"></param>
        ''' <returns></returns>
        ''' <remarks></remarks>
        Public Shared Function WordsCount(ByVal s As String) As Integer
            Dim items = s.Split(_seperators, StringSplitOptions.RemoveEmptyEntries)
            If items.Any() Then
                Return items.Length
            Else
                Return 0
            End If
        End Function

    End Class

End Namespace
