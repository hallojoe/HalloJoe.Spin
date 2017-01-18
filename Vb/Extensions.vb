Imports Microsoft.VisualBasic
Imports System.Runtime.CompilerServices
Imports HalloJoe.Spin.Vb
Namespace HalloJoe.Spin.Vb
    Module SpinExtensions
        ''' <summary>
        ''' Shorthand for generating a random spin result as string only
        ''' </summary>
        ''' <param name="s"></param>
        ''' <param name="rnd"></param>
        ''' <returns></returns>
        <Extension()>
        Public Function Spin(ByRef s As String, Optional ByVal rnd As Random = Nothing) As String
            If rnd Is Nothing Then rnd = New Random()
            Return Spin(s, rnd)
        End Function
    End Module
End Namespace
